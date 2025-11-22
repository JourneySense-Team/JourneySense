export interface Hub {
    key: string;
    label: string;
    description: string;
    iconClass: string;
}

export const HUB_DATA: Hub[] = [
    { key: 'hub1', label: 'Design Hub', description: 'Dedicated space for all design assets, discussions, and mockups.', iconClass: 'pi pi-palette' },
    { key: 'hub2', label: 'Development Hub', description: 'Focus on development tasks, sprint updates, and technical documentation.', iconClass: 'pi pi-code' },
    { key: 'hub3', label: 'Marketing & Sales', description: 'Central area for campaign strategies, sales reports, and customer insights.', iconClass: 'pi pi-megaphone' },
    { key: 'hub4', label: 'HR & Onboarding', description: 'Documents and resources for new hires and team policies.', iconClass: 'pi pi-users' },
    { key: 'hub5', label: 'Infrastructure', description: 'Monitoring and configuration for cloud resources and services.', iconClass: 'pi pi-server' },
];