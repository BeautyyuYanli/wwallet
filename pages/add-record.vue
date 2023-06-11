<script setup lang="ts">
import { Record } from '~/utils/types';
const addRecord = async (record: Partial<Record>) => {
    if (await useFetch("/api/addRecord", {
        method: "POST",
        body: JSON.stringify({ record: record }),
    }).data.value == null)
        console.warn("add failed");
}
const addRecordHandler = (record: Partial<Record>) => {
    addRecord(record);
}
</script>
<template>
    <v-container>
        <v-card>
            <v-card-title>
                新增记录
            </v-card-title>
            <v-card-text>
                <RecordForm @proc-record="addRecordHandler"></RecordForm>
            </v-card-text>
        </v-card>
    </v-container>
</template>