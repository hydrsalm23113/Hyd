const { put, list } = require('@vercel/blob');
const KEY = 'site-data.json';
module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  try {
    if (req.method === 'GET') {
      const { blobs } = await list({ prefix: KEY });
      const b = blobs.find(x => x.pathname === KEY);
      if (!b) return res.status(404).json({ error: 'none' });
      const r = await fetch(b.url + '?t=' + Date.now());
      return res.status(200).json(await r.json());
    }
    if (req.method === 'POST') {
      const pw = process.env.ADMIN_PASSWORD;
      if (!pw || req.headers['x-admin-password'] !== pw) return res.status(401).json({ error: 'كلمة المرور غير صحيحة' });
      const d = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      if (!d || !Array.isArray(d.items) || !Array.isArray(d.cats) || !Array.isArray(d.addons)) return res.status(400).json({ error: 'بيانات غير صالحة' });
      await put(KEY, JSON.stringify(d), { access: 'public', addRandomSuffix: false, allowOverwrite: true, contentType: 'application/json', cacheControlMaxAge: 60 });
      return res.status(200).json({ ok: true });
    }
    res.status(405).end();
  } catch (e) { res.status(500).json({ error: String(e.message || e) }); }
};
