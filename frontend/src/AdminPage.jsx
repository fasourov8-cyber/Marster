import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";

const API = process.env.REACT_APP_BACKEND_URL;

const FIELDS = [
  { key: "ca", label: "Contract address (CA)", placeholder: "Paste the pump.fun contract address", testid: "admin-field-ca" },
  { key: "pumpfunUrl", label: "pump.fun link", placeholder: "https://pump.fun/coin/...", testid: "admin-field-pumpfun" },
  { key: "twitterUrl", label: "X / Twitter link", placeholder: "https://x.com/yourhandle", testid: "admin-field-twitter" },
  { key: "ticker", label: "Ticker", placeholder: "$MARSTER", testid: "admin-field-ticker" },
  { key: "heroSubline", label: "Hero subline", placeholder: "Text under the big headline", testid: "admin-field-subline", textarea: true },
];

const MEME_SLOTS = [
  { name: "Meme 1 — Me crawling to Mars" },
  { name: "Meme 2 — Me after buying" },
  { name: "Meme 3 — Gas tank: empty" },
  { name: "Meme 4 — Mars: arrived" },
];

export default function AdminPage() {
  const [auth, setAuth] = useState(null); // null = checking, false = logged out, object = user
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [config, setConfig] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    document.title = "MARSter Admin";
    fetch(`${API}/api/auth/me`, { credentials: "include" })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((u) => setAuth(u))
      .catch(() => setAuth(false));
  }, []);

  useEffect(() => {
    if (!auth) return;
    fetch(`${API}/api/config`)
      .then((r) => r.json())
      .then(setConfig)
      .catch(() => toast.error("Could not load config"));
  }, [auth]);

  const login = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const r = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      if (!r.ok) {
        const d = await r.json().catch(() => ({}));
        const detail = typeof d.detail === "string" ? d.detail : "Login failed";
        throw new Error(detail);
      }
      setAuth(await r.json());
      toast.success("Welcome back, commander");
    } catch (err) {
      setError(err.message);
    }
  };

  const logout = async () => {
    await fetch(`${API}/api/auth/logout`, { method: "POST", credentials: "include" });
    setAuth(false);
    setConfig(null);
  };

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const r = await fetch(`${API}/api/admin/config`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(config),
      });
      if (!r.ok) throw new Error("Save failed");
      setConfig(await r.json());
      toast.success("Saved — live on the site now");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#12081f] px-4 py-16 font-mono text-[#fff0e2]" data-testid="admin-page">
      <Toaster theme="dark" position="bottom-right" richColors />
      <div className="mx-auto max-w-xl">
        <h1 className="mb-2 text-2xl font-bold uppercase tracking-widest text-[#ffcf3d]" data-testid="admin-title">
          MARSter Mission Control
        </h1>
        <p className="mb-10 text-sm text-[#d8b49b]">Admin panel — update links and launch details.</p>

        {auth === null && <p data-testid="admin-loading">Checking session…</p>}

        {auth === false && (
          <form onSubmit={login} className="flex flex-col gap-4" data-testid="admin-login-form">
            <label className="flex flex-col gap-2 text-xs uppercase tracking-widest text-[#d8b49b]">
              Email
              <input
                data-testid="admin-login-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-lg border border-[#4a2418] bg-[#1f0e0a] px-4 py-3 text-base text-[#fff0e2] outline-none focus:border-[#ffcf3d]"
              />
            </label>
            <label className="flex flex-col gap-2 text-xs uppercase tracking-widest text-[#d8b49b]">
              Password
              <input
                data-testid="admin-login-password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-lg border border-[#4a2418] bg-[#1f0e0a] px-4 py-3 text-base text-[#fff0e2] outline-none focus:border-[#ffcf3d]"
              />
            </label>
            {error && (
              <p className="text-sm text-[#ef3a24]" data-testid="admin-login-error">{error}</p>
            )}
            <button
              data-testid="admin-login-submit"
              type="submit"
              className="mt-2 rounded-lg bg-[#ef3a24] px-6 py-3 text-sm font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-90"
            >
              Log in
            </button>
          </form>
        )}

        {auth && config && (
          <form onSubmit={save} className="flex flex-col gap-5" data-testid="admin-config-form">
            {FIELDS.map((f) => (
              <label key={f.key} className="flex flex-col gap-2 text-xs uppercase tracking-widest text-[#d8b49b]">
                {f.label}
                {f.textarea ? (
                  <textarea
                    data-testid={f.testid}
                    rows={3}
                    value={config[f.key] || ""}
                    onChange={(e) => setConfig({ ...config, [f.key]: e.target.value })}
                    placeholder={f.placeholder}
                    className="rounded-lg border border-[#4a2418] bg-[#1f0e0a] px-4 py-3 text-base normal-case tracking-normal text-[#fff0e2] outline-none focus:border-[#ffcf3d]"
                  />
                ) : (
                  <input
                    data-testid={f.testid}
                    type="text"
                    value={config[f.key] || ""}
                    onChange={(e) => setConfig({ ...config, [f.key]: e.target.value })}
                    placeholder={f.placeholder}
                    className="rounded-lg border border-[#4a2418] bg-[#1f0e0a] px-4 py-3 text-base normal-case tracking-normal text-[#fff0e2] outline-none focus:border-[#ffcf3d]"
                  />
                )}
              </label>
            ))}
            <div className="mt-4 border-t border-[#4a2418] pt-6">
              <h2 className="mb-1 text-lg font-bold uppercase tracking-widest text-[#ffcf3d]" data-testid="admin-memes-title">
                Meme bay
              </h2>
              <p className="mb-5 text-xs leading-relaxed text-[#d8b49b]/80">
                Leave everything empty to keep the built-in animated memes. Add an image URL to replace one, and captions to change its text.
              </p>
              {(config.memes || []).map((m, i) => (
                <div key={i} className="mb-5 rounded-lg border border-[#4a2418] bg-[#150a07] p-4" data-testid={`admin-meme-slot-${i + 1}`}>
                  <p className="mb-3 text-xs uppercase tracking-widest text-[#8be9ff]">{MEME_SLOTS[i]?.name || `Meme ${i + 1}`}</p>
                  <div className="flex flex-col gap-3">
                    <input
                      data-testid={`admin-meme-${i + 1}-image`}
                      type="text"
                      value={m.image || ""}
                      onChange={(e) => {
                        const memes = [...config.memes];
                        memes[i] = { ...memes[i], image: e.target.value };
                        setConfig({ ...config, memes });
                      }}
                      placeholder="Image URL (optional — replaces the built-in meme)"
                      className="rounded-lg border border-[#4a2418] bg-[#1f0e0a] px-4 py-2.5 text-sm text-[#fff0e2] outline-none focus:border-[#ffcf3d]"
                    />
                    <div className="flex gap-3">
                      <input
                        data-testid={`admin-meme-${i + 1}-top`}
                        type="text"
                        value={m.top || ""}
                        onChange={(e) => {
                          const memes = [...config.memes];
                          memes[i] = { ...memes[i], top: e.target.value };
                          setConfig({ ...config, memes });
                        }}
                        placeholder="Top caption"
                        className="w-1/2 rounded-lg border border-[#4a2418] bg-[#1f0e0a] px-4 py-2.5 text-sm text-[#fff0e2] outline-none focus:border-[#ffcf3d]"
                      />
                      <input
                        data-testid={`admin-meme-${i + 1}-bottom`}
                        type="text"
                        value={m.bottom || ""}
                        onChange={(e) => {
                          const memes = [...config.memes];
                          memes[i] = { ...memes[i], bottom: e.target.value };
                          setConfig({ ...config, memes });
                        }}
                        placeholder="Bottom caption"
                        className="w-1/2 rounded-lg border border-[#4a2418] bg-[#1f0e0a] px-4 py-2.5 text-sm text-[#fff0e2] outline-none focus:border-[#ffcf3d]"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-2 flex items-center gap-4">
              <button
                data-testid="admin-save-button"
                type="submit"
                disabled={saving}
                className="rounded-lg bg-[#ffcf3d] px-6 py-3 text-sm font-bold uppercase tracking-widest text-[#2c1510] transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                {saving ? "Saving…" : "Save changes"}
              </button>
              <button
                data-testid="admin-logout-button"
                type="button"
                onClick={logout}
                className="text-sm uppercase tracking-widest text-[#d8b49b] underline-offset-4 hover:underline"
              >
                Log out
              </button>
              <a href="/" className="text-sm uppercase tracking-widest text-[#8be9ff] underline-offset-4 hover:underline" data-testid="admin-view-site-link">
                View site
              </a>
            </div>
            <p className="text-xs leading-relaxed text-[#d8b49b]/70">
              Changes go live instantly. The CA chip Copy buttons activate as soon as a contract address is saved.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
