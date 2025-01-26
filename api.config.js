import { PlaywrightTestConfig } from "playwright/test";

const config = {
    timeout: 6000,
    retries: 0,
    testDir: 'tests/api',
    use : {
        headless: true,
        viewport: { width: 1280 },
        actionTimeout: 10000,
        ignoreHTTPSErrors: true,
        video: 'off',
        screenshot: 'off'
    },
    projects: [
        {
            name: 'chromium',
            use: { browserName: 'chromium'},
        },
        {
            name: 'firefox',
            use: {browserName: 'firefox'},
        },
        {
            name: 'webkit',
            use: { browserName: 'webkit'},
        },
    ],
}

export default config