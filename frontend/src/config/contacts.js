// Контактные данные компании — единый источник правды.
// Меняешь здесь — меняется везде на сайте.

export const PHONE_RAW = "+99899(+99877) 276 67 67";
export const PHONE_DISPLAY = "(+99877) 276 67 67";
export const PHONE_DISPLAY_ALT = "(+99877) 276 67 67";
export const PHONE_HREF = `tel:${PHONE_RAW}`;

export const EMAIL = "info@benka.uz";
export const EMAIL_HREF = `mailto:${EMAIL}`;

export const MAP_COORDS = "69.243867,41.266974";
export const MAP_ZOOM = 16;
export const YANDEX_MAP_WIDGET = `https://yandex.ru/map-widget/v1/?ll=${encodeURIComponent(MAP_COORDS)}&z=${MAP_ZOOM}&pt=${MAP_COORDS},pm2rdm`;
export const YANDEX_MAP_LINK = `https://yandex.uz/maps/?ll=${encodeURIComponent(MAP_COORDS)}&z=${MAP_ZOOM}&pt=${MAP_COORDS},pm2rdm`;
