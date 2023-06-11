<script setup lang="ts">
definePageMeta({
    middleware: (to, from) => {
        return navigateTo('/dashboard');
    },
})
</script>