import { getAssetFromKV, serveSinglePageApp } from '@cloudflare/kv-asset-handler'

addEventListener('fetch', event => {
  event.respondWith(handleEvent(event))
})

async function handleEvent(event) {
  try {
    return await getAssetFromKV(event, {
      mapRequestToAsset: serveSinglePageApp
    })
  } catch (e) {
    return new Response('Page not found', {
      status: 404,
      statusText: 'not found'
    })
  }
}
