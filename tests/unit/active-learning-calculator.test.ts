import { describe, it, expect } from 'vitest';
import { hashIpAddress } from '../../src/lib/audit-logger';

describe('Audit Logger & Active Learning Utilities', () => {
  it('anonymizes IP addresses using SHA-256 hash formatting', async () => {
    const ip = '192.168.1.50';
    const hash = await hashIpAddress(ip);

    expect(hash).toBeDefined();
    expect(typeof hash).toBe('string');
    expect(hash.length).toBeGreaterThan(10);
    expect(hash).not.toContain('192.168.1.50');
  });

  it('produces consistent hashes for the same IP address', async () => {
    const ip = '85.136.12.99';
    const hash1 = await hashIpAddress(ip);
    const hash2 = await hashIpAddress(ip);

    expect(hash1).toEqual(hash2);
  });
});
