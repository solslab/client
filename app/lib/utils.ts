
import { PLATFORMLIST, SPRING_URL } from "./constants";


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
        return null// 플랫폼이 없을 경우
    }



    return platformIndex
}

export const  getDateOneMonthLater = (): Date=> {
    const currentDate = new Date();
    const oneMonthLater = new Date(currentDate);
    
    // 현재 날짜에 1개월을 더합니다.
    oneMonthLater.setMonth(currentDate.getMonth() + 1);
    
    return oneMonthLater;
  }