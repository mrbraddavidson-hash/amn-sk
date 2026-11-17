// Connects the Worker bindings from wrangler.jsonc (generated in worker-configuration.d.ts)
// to the CloudflareEnv type that @opennextjs/cloudflare uses in getCloudflareContext().
interface CloudflareEnv extends Cloudflare.Env {}
