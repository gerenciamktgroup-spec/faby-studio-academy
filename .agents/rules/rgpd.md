# RGPD Privacy-by-Design Rules - Fabi Studio Academy

## RGPD & AEPD Educational Platform Guidelines
1. **Consent Tracking**: Every user signup or data capture MUST log an entry in `consent_records` with version ID, timestamp, and IP hash.
2. **Data Minimization**: Never collect unnecessary PII beyond academic identification, verification, and audit requirements.
3. **Data Subject Rights**:
   - Right to Access / Export: Export user's learning records & personal data in JSON format (`data_export_requests`).
   - Right to Erasure / Anonymization: Pseudonymize student personal info upon approved `data_deletion_requests` while maintaining anonymous audit event integrity for legal compliance retention.
4. **Retention Policies**: Configure retention limits in `data_retention_policies` for operational vs regulatory logs.
