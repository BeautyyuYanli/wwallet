<script setup lang="ts">
const pages = [
    {
        name: '主面板',
        path: '/dashboard',
        icon: 'mdi-view-dashboard'
    },
    {
        name: '所有记录',
        path: '/records',
        icon: 'mdi-receipt-text'
    },
    {
        name: '增加记录',
        path: '/add-record',
        icon: 'mdi-plus-circle'
    }
];
</script>
<template>
    <v-app>
        <v-navigation-drawer>
            <v-list nav>
                <v-list-item v-for="page in pages" :value="page.path" :to="page.path" :prepend-icon="page.icon">
                    {{ page.name }}
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-main>

            <slot></slot>
        </v-main>
    </v-app>
</template>