<script setup lang="ts">
// Reading data
import type { Record, Account } from "~/utils/types";
const respond_records = await useFetch("/api/getRecords");
const raw_records = respond_records.data;
const records = computed(() => {
    if (raw_records.value !== null)
        return (JSON.parse(raw_records.value) as Record[]).sort((a, b) => {
            return b.id - a.id;
        });

    else
        return [];
});
// ==============================
// dialog signal
const dialog_open = ref(false);
const dialog_del = ref(false);
let dialog_record: Record;
// API caller
const deleteRecord = async (record: Record) => {
    if (await useFetch("/api/deleteRecord", {
        method: "POST",
        body: JSON.stringify({ id: record.id }),
    }).data.value == null)
        console.warn("delete failed");

    await respond_records.refresh();
}
const updateRecord = async (record: Record) => {
    if (await useFetch("/api/updateRecord", {
        method: "POST",
        body: JSON.stringify({ record: record }),
    }).data.value == null)
        console.warn("update failed");

    await respond_records.refresh();
}
const updateRecordHandler = (record: Partial<Record>) => {
    const t = {
        ...dialog_record,
        ...record,
    } as Record;
    updateRecord(t);
    dialog_open.value = false;
}
</script>
<template>
    <v-container>
        <v-card>
            <v-card-title>
                所有记录
            </v-card-title>

            <v-card-text>

                <v-expansion-panels>
                    <v-expansion-panel v-for="(record, i) in records" :key="i">
                        <!-- basic info -->
                        <v-expansion-panel-title>
                            <v-chip variant="text" class="ma-2" v-text="new Date(record.datetime).toLocaleString()" />
                            <v-chip variant="text" class="ma-2" v-text="`${record.value / 100} - ${record.category}`" />
                        </v-expansion-panel-title>
                        <!-- detail info -->
                        <v-expansion-panel-text>
                            <v-chip variant="text" class="ma-2" v-text="record.comment" />
                            <!-- <v-chip class="ma-2" v-for="tag in record.tags" :key="tag">{{ tag }}</v-chip> -->
                            <div class="text-center">
                                <v-btn class="ma-2" append-icon="$edit" variant="tonal"
                                    @click="dialog_open = true, dialog_record = record">
                                    编辑</v-btn>
                                <v-btn class="ma-2" append-icon="$delete" variant="tonal"
                                    @click="dialog_del = true, dialog_record = record">
                                    删除</v-btn>
                                <!-- pop up -->
                                <v-dialog width="auto" v-model="dialog_open">
                                    <v-card>
                                        <v-card-text>
                                            编辑记录
                                        </v-card-text>
                                        <v-card-actions>
                                            <record-form :record="dialog_record"
                                                @proc-record="updateRecordHandler"></record-form>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                                <v-dialog width="auto" v-model="dialog_del">
                                    <v-card>
                                        <v-card-text>
                                            确认删除?
                                        </v-card-text>
                                        <v-card-actions>
                                            <v-btn color="primary"
                                                @click="dialog_del = false, deleteRecord(dialog_record)">确认</v-btn>
                                            <v-btn @click="dialog_del = false">取消</v-btn>
                                        </v-card-actions>
                                    </v-card>

                                </v-dialog>
                            </div>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-card-text>
        </v-card>

    </v-container>
</template>