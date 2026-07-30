set -eu
keytool -genkeypair -alias '__init__' -keystore '/work/vietnam-root.p12' -storetype PKCS12 -storepass 'changeit' -keypass 'changeit' -dname 'CN=temporary' -keyalg RSA -keysize 2048 -validity 1 >/dev/null 2>&1
keytool -delete -alias '__init__' -keystore '/work/vietnam-root.p12' -storetype PKCS12 -storepass 'changeit'
keytool -importcert -noprompt -alias 'neac-1' -file '/work/neac/root-extracted/vnrca-g3/383aa3f6b69841473e7f9c36f2a3cc5dfc1af4c4.crt' -keystore '/work/vietnam-root.p12' -storetype PKCS12 -storepass 'changeit'
keytool -importcert -noprompt -alias 'neac-2' -file '/work/neac/root-extracted/vnrca256/8ea95975898efef73b5ca92bf03f712bfbc7615f.crt' -keystore '/work/vietnam-root.p12' -storetype PKCS12 -storepass 'changeit'
keytool -importcert -noprompt -alias 'neac-3' -file '/work/neac/root-extracted/micnrca.crt' -keystore '/work/vietnam-root.p12' -storetype PKCS12 -storepass 'changeit'
keytool -importcert -noprompt -alias 'neac-4' -file '/work/neac/root-extracted/vnrca-usbtoken/2cbf01cf4692283e6621512351639bcda76d0f19.crt' -keystore '/work/vietnam-root.p12' -storetype PKCS12 -storepass 'changeit'
keytool -importcert -noprompt -alias 'neac-5' -file '/work/neac/root-extracted/vnrca-rs/d7ad01de8df0d139e12abaeb16fd25ea8c126824.crt' -keystore '/work/vietnam-root.p12' -storetype PKCS12 -storepass 'changeit'
keytool -importcert -noprompt -alias 'neac-6' -file '/work/neac/root-extracted/vnrca-mobilepki/236ce542f85db02255545b897acc99d55f737b0a.crt' -keystore '/work/vietnam-root.p12' -storetype PKCS12 -storepass 'changeit'
keytool -importcert -noprompt -alias 'neac-7' -file '/work/neac/root-extracted/vnrca-tsa/e837e8d7077fc4d369c177c751832c16bc39b6a0.crt' -keystore '/work/vietnam-root.p12' -storetype PKCS12 -storepass 'changeit'
keytool -importcert -noprompt -alias 'neac-8' -file '/work/neac/root-extracted/vnrca-ema/4787ba3a4cfb56f15fbc5ca17607d0bffd570722.crt' -keystore '/work/vietnam-root.p12' -storetype PKCS12 -storepass 'changeit'
keytool -importcert -noprompt -alias 'neac-9' -file '/work/neac/root-extracted/vnca-erd/0e67ad68594256d4958a2b3d1123386d6acefebe.crt' -keystore '/work/vietnam-root.p12' -storetype PKCS12 -storepass 'changeit'
keytool -importcert -noprompt -alias 'neac-10' -file '/work/neac/root-extracted/vnca-lta/5630b91fc182bf4a516a8fd205c430cdafff96fc.crt' -keystore '/work/vietnam-root.p12' -storetype PKCS12 -storepass 'changeit'
