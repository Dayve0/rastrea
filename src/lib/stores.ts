import type { Store } from "./types";

export const STORES: Store[] = [
  // { id: 'amazon', name: 'Amazon', short: 'am', color: 'oklch(0.72 0.16 60)' },
  // { id: 'mercadolivre', name: 'Mercado Livre', short: 'ML', color: 'oklch(0.82 0.15 95)' },
  // { id: 'magalu', name: 'Magazine Luiza', short: 'MG', color: 'oklch(0.6 0.2 265)' },
  // { id: 'americanas', name: 'Americanas', short: 'AM', color: 'oklch(0.6 0.23 25)' },
  // { id: 'casasbahia', name: 'Casas Bahia', short: 'CB', color: 'oklch(0.62 0.2 250)' },
  // { id: 'shopee', name: 'Shopee', short: 'SH', color: 'oklch(0.68 0.2 40)' },
  // { id: 'aliexpress', name: 'AliExpress', short: 'AE', color: 'oklch(0.62 0.24 25)' },
  { id: "kabum", name: "KaBuM!", short: "KB", color: "oklch(0.68 0.19 45)" },
];

export const STORE_MAP: Record<string, Store> = Object.fromEntries(
  STORES.map((s) => [s.id, s]),
);
