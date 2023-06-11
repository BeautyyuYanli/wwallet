<script setup lang="ts">
// Reading data
import type { Record, Account } from "../utils/types";
const respond_records = await useFetch("/api/getRecords");
const raw_records = respond_records.data;
const records = computed(() => {
    if (raw_records.value !== null)
        return JSON.parse(raw_records.value) as Record[];
    else
        return [];
});
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
// ==============================
interface AccountWithBalance extends Account {
    balance: number;
}
const accounts_with_balance = computed(() => {
    return accounts.value.map((account: Account) => {
        return {
            ...account,
            balance: records.value.reduce((acc: number, cur: Record) => {
                if (cur.account_id == account.id) {
                    return acc + cur.value;
                } else {
                    return acc;
                }
            }, 0) / 100
        } as AccountWithBalance;
    })
})
// dialog signal
let dialog = ref(false);
let new_account = ref({
    name: "",
    comment: "",
    id: -1
} as Account);
const addAccount = async (account: Account) => {
    if (await useFetch("/api/addAccount", {
        method: "POST",
        body: JSON.stringify({ account: account }),
    }).data.value == null)
        console.warn("add failed");
    await respond_accounts.refresh();
}
let dialog_del = ref(false);
const delAccount = async (account_id: number) => {
    if (await useFetch("/api/deleteAccount", {
        method: "POST",
        body: JSON.stringify({ id: account_id }),
    }).data.value == null)
        console.warn("delete failed");
    await respond_accounts.refresh();
}
</script>
<template>
    <v-container>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title> 所有账户 </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row v-for="r in accounts_with_balance.length" :key="r">
                                <v-col v-for=" account in accounts_with_balance.slice(r * 3 - 3, r * 3)" :key="account.id">
                                    <v-card>
                                        <v-card-title>
                                            {{ account.name }}

                                        </v-card-title>
                                        <v-card-subtitle>
                                            <v-container>
                                                <v-row>
                                                    {{ account.comment }}
                                                    <!-- <v-spacer></v-spacer>
                                                    <v-btn @click="dialog_del = true" variant="flat" small>删除</v-btn>
                                                    <v-dialog width="auto" v-model="dialog_del">
                                                        <v-card>
                                                            <v-card-text>
                                                                确认删除?
                                                            </v-card-text>
                                                            <v-card-actions>
                                                                <v-btn
                                                                    @click="dialog_del = false, delAccount(account.id)">确认</v-btn>
                                                                <v-btn @click="dialog_del = false">取消</v-btn>
                                                            </v-card-actions>
                                                        </v-card>
                                                    </v-dialog> -->
                                                </v-row>
                                            </v-container>
                                        </v-card-subtitle>
                                        <v-card-text>
                                            余额 {{ account.balance }}

                                        </v-card-text>
                                    </v-card>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-spacer></v-spacer>
                                <v-col cols="1">
                                    <v-btn icon="mdi-plus" @click="dialog = true"></v-btn>
                                    <v-dialog width="auto" v-model="dialog">
                                        <v-card>
                                            <v-card-text>
                                                <v-form>
                                                    <v-text-field label="账户名" v-model="new_account.name"></v-text-field>
                                                    <v-text-field label="备注" v-model="new_account.comment"></v-text-field>
                                                    <v-btn class="ma-2" @click="addAccount(new_account), dialog = false"
                                                        variant="tonal">添加</v-btn>
                                                    <v-btn class="ma-2" @click="dialog = false" variant="tonal">取消</v-btn>
                                                </v-form>
                                            </v-card-text>
                                        </v-card>
                                    </v-dialog>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <!-- <v-row>
            <v-col>
                <v-card>
                    <v-card-title> GPT 查询</v-card-title>
                </v-card>
            </v-col>
        </v-row> -->
    </v-container>
</template>