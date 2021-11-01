export enum DeviceType {
    TRAY_9_SLOT_EXTERNAL = 'tray_9_slot_external',
    TRAY_8_SLOT_MINIBAR = 'tray_8_slot_minibar',
    TRAY_9_SLOT_MINIBAR = 'tray_9_slot_minibar'
}

export const deviceTypesMapping: Record<DeviceType, string> = {
    [DeviceType.TRAY_9_SLOT_EXTERNAL]: "tray_9_slot_external",
    [DeviceType.TRAY_8_SLOT_MINIBAR]: "tray_8_slot_minibar",
    [DeviceType.TRAY_9_SLOT_MINIBAR]: "tray_9_slot_minibar",
};