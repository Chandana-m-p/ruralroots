import { db } from '../db';
import orderService from './orderService';

export async function syncPendingOrders(token?: string): Promise<number> {
  const queuedOrders = await db.pendingOrders.where('syncStatus').equals('QUEUED').toArray();
  if (queuedOrders.length === 0) return 0;

  let syncedCount = 0;

  for (const order of queuedOrders) {
    try {
      const payload = {
        idempotencyKey: order.idempotencyKey,
        hubId: order.hubId,
        paymentType: order.paymentType,
        totalAmount: order.totalAmount,
        offlineCreatedAt: order.offlineCreatedAt,
        items: order.items.map(i => ({
          productId: i.productId,
          productTitle: i.productTitle,
          quantity: i.quantity,
          unitPrice: i.unitPrice
        }))
      };

      await orderService.syncOrder(payload);
      if (order.id) {
        await db.pendingOrders.update(order.id, { syncStatus: 'SYNCED' });
      }
      syncedCount++;
    } catch (err) {
      console.warn('Sync failed for order idempotency key:', order.idempotencyKey, err);
    }
  }

  return syncedCount;
}
