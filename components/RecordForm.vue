<script setup lang="ts">
// Reading data
import type { Record, Account } from "../utils/types";
const respond_accounts = await useFetch("/api/getAccounts");
const raw_accounts = respond_accounts.data;
const accounts = computed(() => {
    if (raw_accounts.value !== null) {
        let accounts = JSON.parse(raw_accounts.value) as Account[];
        return accounts;
    }
    else
        return [];
});
// DatePicker
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
// meta
const props = defineProps({
    record: {
        type: Object as PropType<Record>,
        default: undefined
    }
})
const emit = defineEmits({
    procRecord: (record: Partial<Record>): any => { },
})

// data
const value = ref()
const valueRules = [(v: string) => /^[\+-]?\d+(\.\d{1,2})?$/.test(v) ? true : '请输入正确的金额']
const category = ref('默认')
const categoryItems = [
    "默认",
    "餐饮",
    "交通",
    "购物",
    "娱乐",
    "居家",
    "通讯",
    "人情",
    "医疗",
    "旅行",
    "学习",
    "其他"
]
const categoryRules = [(v: string) => !!v || '请输入类别']
const comment = ref('')
const commentRules = [(v: string) => v.length <= 1024 || '不超过1024个字符']
const account_select = ref()
const account_rules = [(v: string) => !!v || '请选择账户']
const datetime: Ref<Date | undefined> = ref();
const datetimeDisplay = computed({
    get: () => {
        if (datetime.value)
            return datetime.value.toLocaleString();
        else
            return "UNSET";
    },
    set: (v: string) => { }
});
const datetimeRules = [(v: string) => v == "UNSET" ? '请选择时间' : true,]
const initData = (record?: Record) => {
    if (record) {
        value.value = `${record.value / 100.0}`
        category.value = record.category
        comment.value = record.comment
        account_select.value = record.account_id
        datetime.value = new Date(record.datetime)
    }
    else {
        value.value = undefined
        category.value = '默认'
        comment.value = ''
        account_select.value = undefined
        datetime.value = undefined
    }
}
if (props.record)
    initData(props.record)
// form
const loading = ref(false)
const submit = async (event: Promise<any>) => {
    loading.value = true;
    // Validate
    await event;
    // Submit
    const record = {
        account_id: account_select.value,
        value: parseFloat(value.value ?? "0") * 100 as number,
        datetime: datetime.value?.toISOString() ?? new Date().toISOString(),
        category: category.value,
        comment: comment.value,
    } as Partial<Record>;
    emit("procRecord", record);
    // Reset
    initData()
    loading.value = false;
}
</script>
<template>
    <v-form ref="form" @submit.prevent="submit">
        <v-text-field v-model="value" :rules="valueRules" label="*金额" placeholder="-0.00" required></v-text-field>
        <v-combobox v-model="category" :rules="categoryRules" :items="categoryItems" label="*类别" required></v-combobox>
        <v-select v-model="account_select" :items="accounts" item-title="name" item-value="id" :rules="account_rules"
            label="*账户" required></v-select>
        <v-textarea v-model="comment" :rules="commentRules" label="备注" auto-grow></v-textarea>
        <v-text-field v-model="datetimeDisplay" :rules="datetimeRules" label="*时间" variant="outlined" readonly required>
            <vue-date-picker v-model="datetime"></vue-date-picker>
        </v-text-field>
        <v-btn type="submit" :loading="loading" block variant="tonal">提交</v-btn>
    </v-form>
</template>
