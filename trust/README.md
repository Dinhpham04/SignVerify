# Vietnam CA trust material

Generated files are created by:

```powershell
.\scripts\update-vietnam-ca.ps1
```

The script reads certificate links from `https://rootca.gov.vn`:

- `vietnam-root.p12`: Vietnam National Root CA certificates used as DSS trust anchors.
- `vietnam-public-adjunct.p12`: active public CA certificates used as adjunct certificates for chain building, not as trust anchors.

The generated PKCS12 files contain public certificates only. The default local password is `changeit`; override it with `-StorePassword` for deployment.
