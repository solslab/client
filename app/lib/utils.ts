import { PLATFORMLIST } from "./constants";
import { getToken } from "./cookie";
const url = process.env.SPRING_URL
export async function infoCheck() {
    try {
        const headers: { 'Content-Type': string; 'Cache-Control': string; 'Authorization'?: string } = {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        };
        const token = await getToken();
        if (!token) {
            return false
        }
        const value = token?.value;
        if (value) {
            headers['Authorization'] = `Bearer ${value}`;
        }
        const response = await fetch(`${url}/member/info-check`, {
            method: 'GET',
            headers: headers
        });
        if (!response.ok) {
            throw new Error(`${response.status}`);
        }
        const data = await response.json();
        if (data.status == "complete") {
            return true
        }
        else {
            return false
        }
    }
    catch (error) {
        console.log(error)
        return false
    }
}

export function findPlatformAndLabel(code: string, value: number): { platform: string; label: string } | undefined {
    for (const item of PLATFORMLIST) {
        if (item.code === code) {
            const level = item.level.find(l => l.value === value);
            if (level) {
                return { platform: item.platform, label: level.label };
            }
        }
    }
    return undefined;
}
export const findPlatformIndex = (code: string) => {
    const platformIndex = PLATFORMLIST.findIndex(
        (platform) => platform.code === code
    );

    if (platformIndex === -1) {
        return -1// 플랫폼이 없을 경우
    }



    return platformIndex
}