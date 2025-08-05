<template>
    <div ref="containerRef" class="contact-cta-container">
        <!-- Contact Options Menu -->
        <div v-if="isOpen" class="contact-options-menu">
            <div v-for="(option, index) in contactOptions" :key="option.id" class="contact-option-wrapper"
                :style="{ animationDelay: `${index * 100}ms` }" @click="handleContactClick(option.url)">
                <!-- Contact Card -->
                <div class="contact-card">
                    <!-- Icon -->
                    <div class="contact-icon" :style="{ backgroundColor: option.color }">
                        <img :src="option.icon" :alt="option.name" width="24" height="24" class="icon-image">
                    </div>

                    <!-- Text Content -->
                    <div class="contact-text">
                        <span class="contact-name">
                            {{ option.name }}
                        </span>
                        <span class="contact-subtitle">Rašyti Žinutę</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Main CTA Button -->
        <button class="cta-button" :class="{ 'cta-button-open': isOpen, 'cta-button-closed': !isOpen }"
            :aria-label="isOpen ? 'Close contact options' : 'Open contact options'" @click="isOpen = !isOpen">
            <!-- X Mark Icon -->
            <svg v-if="isOpen" class="button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <!-- Chat Bubble Icon -->
            <svg v-else class="button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
        </button>

        <!-- Background Overlay - Minimal -->
        <div v-if="isOpen" class="background-overlay" @click="isOpen = false" />
    </div>
</template>

<script setup lang="ts">
interface ContactOption {
    id: string;
    name: string;
    icon: string;
    color: string;
    url: string;
}




const isOpen = ref(false)
const containerRef = ref<HTMLDivElement>()

const contactOptions: ContactOption[] = [
    {
        id: 'whatsapp',
        name: 'WhatsApp',
        icon: '/img/icons/whatsapp.svg',
        color: '#25D366',
        url: `https://wa.me/+37060508501`,
    },
    {
        id: 'messenger',
        name: 'Facebook',
        icon: '/img/icons/fb-chat.svg',
        color: '#0084FF',
        url: 'https://m.me/vladis.vaisov',
    },
    {
        id: 'viber',
        name: 'Viber',
        icon: '/img/icons/viber.svg',
        color: '#665CAC',
        url: 'viber://contact?number=%2B370 6 05 08 501',
    },
]

const handleContactClick = (url: string) => {
    window.location.href = url
    isOpen.value = false
}

// Handle click outside
onMounted(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (
            containerRef.value &&
            !containerRef.value.contains(event.target as Node)
        ) {
            isOpen.value = false
        }
    }

    watch(isOpen, (newValue) => {
        if (newValue) {
            document.addEventListener('mousedown', handleClickOutside)
        } else {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    })

    onUnmounted(() => {
        document.removeEventListener('mousedown', handleClickOutside)
    })
})
</script>

<style scoped>
.contact-cta-container {
    position: fixed;
    bottom: 24px;
    right: 24px;
    z-index: 50;
}

.contact-options-menu {
    position: absolute;
    bottom: 64px;
    right: 0;
    margin-bottom: 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    animation: slideInFromBottom 0.3s ease-out;
}

.contact-option-wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    cursor: pointer;
    animation: slideInFromBottom 0.3s ease-out;
    animation-fill-mode: both;
}

.contact-card {
    background-color: #334155;
    border-radius: 8px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    display: flex;
    align-items: center;
    padding: 12px;
    margin-right: 0;
    min-width: 192px;
    transition: background-color 0.2s ease;
}

.contact-card:hover {
    background-color: #475569;
}

.contact-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 12px;
    flex-shrink: 0;
}

.icon-image {
    width: 24px;
    height: 24px;
}

.contact-text {
    display: flex;
    flex-direction: column;
    text-align: left;
}

.contact-name {
    color: white;
    font-weight: 500;
    font-size: 14px;
}

.contact-subtitle {
    color: #d1d5db;
    font-size: 12px;
}

.cta-button {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    border: none;
    cursor: pointer;
    color: white;
}

.cta-button-closed {
    background-color: #4976A8;
    /* Assuming 'accent' is red */
}

.cta-button-closed:hover {
    background-color: #4976A8;
    transform: scale(1.1);
}

.cta-button-open {
    background-color: #4b5563;
}

.cta-button-open:hover {
    background-color: #374151;
}

.button-icon {
    width: 24px;
    height: 24px;
}

.background-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: transparent;
    z-index: -10;
}

@keyframes slideInFromBottom {
    from {
        opacity: 0;
        transform: translateY(16px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Responsive adjustments */
@media (max-width: 640px) {
    .contact-cta-container {
        bottom: 16px;
        right: 16px;
    }

    .contact-card {
        min-width: 160px;
        padding: 10px;
    }

    .contact-name {
        font-size: 13px;
    }

    .contact-subtitle {
        font-size: 11px;
    }
}
</style>