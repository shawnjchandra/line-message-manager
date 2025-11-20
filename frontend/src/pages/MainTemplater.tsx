import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import TranslationButton from "../components/TranslationButton/TranslationButton";

type Project = {
  id: string;
  title: string;
  owner: string;
  updatedAgo: string;
};

const bg: React.CSSProperties = {
  minHeight: "100vh",
  background:
    "linear-gradient(135deg, rgba(54,199,120,0.18) 0%, rgba(125,209,165,0.18) 40%, rgba(152,221,210,0.18) 100%)",
};

const shell: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "280px 1fr",
  gap: 16,
  maxWidth: 1200,
  margin: "0 auto",
  padding: "24px 20px 40px",
};

const panel: React.CSSProperties = {
  background: "#fff",
  borderRadius: 14,
  boxShadow: "0 10px 25px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.06)",
};

export default function MainTemplater() {
  const { t } = useTranslation();

  // dummy data
  const [projects] = useState<Project[]>([
    { id: "1", title: "Coba", owner: "You", updatedAgo: "30 minutes ago" },
    { id: "2", title: "Project", owner: "You", updatedAgo: "an hour ago" },
    { id: "3", title: "Lihat3", owner: "You", updatedAgo: "2 hours ago" },
    { id: "4", title: "Template", owner: "You", updatedAgo: "3 months ago" },
    { id: "5", title: "Figma", owner: "You", updatedAgo: "3 years ago" },
  ]);

  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return projects;
    return projects.filter((p) => p.title.toLowerCase().includes(s));
  }, [q, projects]);

  const [openModal, setOpenModal] = useState(false);
  const [assetType, setAssetType] = useState<"card" | null>(null);

  function confirmNewProject() {
    
    setOpenModal(false);
  }

  return (
    <div style={bg}>
      {/* switch bahasa */}
      <div style={{ position: "fixed", right: 16, bottom: 16, zIndex: 5 }}>
        <TranslationButton />
      </div>

      <div style={shell}>
        {/* SIDEBAR */}
        <aside style={{ ...panel, padding: 16, alignSelf: "start" }}>
          <button
            onClick={() => setOpenModal(true)}
            style={{
              width: "100%",
              height: 44,
              borderRadius: 999,
              border: "none",
              background: "#0B63CE", 
              color: "#fff",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            {t("templater.newProject")}
          </button>

          <nav style={{ marginTop: 18 }}>
            <SectionLabel>{t("templater.allProjects")}</SectionLabel>
            <SidebarItem active>{t("templater.menuAll")}</SidebarItem>
            <SidebarItem>{t("templater.menuYours")}</SidebarItem> 
            <SidebarItem>{t("templater.menuArchived")}</SidebarItem>
            <SidebarItem>{t("templater.menuTrash")}</SidebarItem>

            <SectionLabel style={{ marginTop: 18 }}>
              {t("templater.organizeTags")}
            </SectionLabel>
            <SidebarItem iconPlus>{t("templater.newTag")}</SidebarItem>
          </nav>
        </aside>

        {/* MAIN LIST */}
        <main style={{ ...panel, padding: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              justifyContent: "space-between",
              padding: "2px 4px 12px",
              borderBottom: "1px solid #e5e7eb",
            }}
          >
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800 }}>
              {t("templater.allProjects")}
            </h2>

            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={t("templater.searchPlaceholder") as string}
                style={{
                  height: 36,
                  minWidth: 280,
                  border: "1px solid #d1d5db",
                  borderRadius: 10,
                  padding: "0 12px",
                  outline: "none",
                }}
              />
              <button
                onClick={() => setOpenModal(true)}
                style={{
                  height: 36,
                  padding: "0 14px",
                  borderRadius: 10,
                  border: "1px solid #d1d5db",
                  background: "#fff",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {t("templater.newProject")}
              </button>
            </div>
          </div>

          {/* table */}
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "separate",
                borderSpacing: 0,
                marginTop: 8,
              }}
            >
              <thead>
                <tr style={{ textAlign: "left", color: "#6b7280" }}>
                  <Th style={{ width: 44 }}>
                    <input type="checkbox" aria-label="select all" />
                  </Th>
                  <Th>{t("templater.colTitle")}</Th>
                  <Th style={{ width: 180 }}>{t("templater.colOwner")}</Th>
                  <Th style={{ width: 200 }}>{t("templater.colLastModified")}</Th>
                  <Th style={{ width: 200 }}>{t("templater.colActions")}</Th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p, i) => (
                  <tr key={p.id} style={{ background: i % 2 ? "#fafafa" : "#fff" }}>
                    <Td style={{ width: 44 }}>
                      <input type="checkbox" aria-label={`select ${p.title}`} />
                    </Td>
                    <Td>
                      <a href="#" style={{ fontWeight: 700, textDecoration: "none", color: "#0B63CE" }}>
                        {p.title}
                      </a>
                    </Td>
                    <Td>{p.owner}</Td>
                    <Td>{p.updatedAgo}</Td>
                    <Td>
                      {/* action icons (SVG) */}
                      <ActionIcon title={t("templater.actOpen") as string}><IcDocument /></ActionIcon>
                      <ActionIcon title={t("templater.actDownload") as string}><IcDownload /></ActionIcon>
                      <ActionIcon title={t("templater.actDuplicate") as string}><IcDuplicate /></ActionIcon>
                      <ActionIcon title={t("templater.actDelete") as string}><IcTrash /></ActionIcon>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p style={{ marginTop: 12, color: "#6b7280" }}>
              {t("templater.showing", { count: filtered.length })}
            </p>
          </div>
        </main>
      </div>

      {/* New project */}
      {openModal && (
        <>
          <div
            onClick={() => setOpenModal(false)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.35)",
              backdropFilter: "blur(1px)",
            }}
          />
          <div
            role="dialog"
            aria-modal="true"
            style={{
              position: "fixed",
              left: "50%",
              top: "50%",
              transform: "translate(-50%,-50%)",
              width: 420,
              background: "#fff",
              borderRadius: 12,
              padding: 20,
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
              zIndex: 10,
            }}
          >
            <h3
              style={{
                margin: 0,
                paddingBottom: 12,
                borderBottom: "1px solid #e5e7eb",
                fontWeight: 800,
                textAlign: "center",
              }}
            >
              {t("templater.selectAssetType")}
            </h3>

            <div style={{ padding: "18px 4px 4px" }}>
              <label
                style={{
                  display: "inline-flex",
                  gap: 10,
                  alignItems: "center",
                  padding: "10px 14px",
                  borderRadius: 10,
                  border: "1px solid #e5e7eb",
                  cursor: "pointer",
                  userSelect: "none",
                }}
              >
                <input
                  type="radio"
                  name="assetType"
                  value="card"
                  checked={assetType === "card"}
                  onChange={() => setAssetType("card")}
                />
                <span style={{ fontWeight: 600 }}>{t("templater.card")}</span>
              </label>
            </div>

            <div
              style={{
                display: "flex",
                gap: 10,
                justifyContent: "center",
                paddingTop: 16,
              }}
            >
              <button
                onClick={() => setOpenModal(false)}
                style={{
                  border: "1px solid #e5e7eb",
                  background: "#f3f4f6",
                  borderRadius: 8,
                  padding: "8px 16px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {t("common.cancel")}
              </button>

              <button
                disabled={!assetType}
                onClick={confirmNewProject}
                style={{
                  border: "none",
                  background: "#0B63CE",
                  color: "#fff",
                  borderRadius: 8,
                  padding: "8px 16px",
                  fontWeight: 700,
                  cursor: assetType ? "pointer" : "not-allowed",
                  opacity: assetType ? 1 : 0.5,
                }}
              >
                {t("common.confirm")}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function SectionLabel(
  props: React.PropsWithChildren<{ style?: React.CSSProperties }>
) {
  return (
    <div
      style={{
        fontSize: 12,
        color: "#6b7280",
        fontWeight: 700,
        letterSpacing: 0.4,
        ...props.style,
      }}
    >
      {props.children}
    </div>
  );
}

function SidebarItem(
  props: React.PropsWithChildren<{ active?: boolean; iconPlus?: boolean }>
) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        marginTop: 8,
        padding: "10px 12px",
        borderRadius: 10,
        fontWeight: 600,
        background: props.active ? "rgba(11, 99, 206, 0.08)" : "transparent",
        color: props.active ? "#0B63CE" : "#111827",
        cursor: "pointer",
      }}
    >
      {props.iconPlus ? (
        <span style={{ fontWeight: 900, marginRight: 2 }}>＋</span>
      ) : null}
      <span>{props.children}</span>
    </div>
  );
}

function Th(props: React.PropsWithChildren<{ style?: React.CSSProperties }>) {
  return (
    <th
      style={{
        padding: "10px 12px",
        borderBottom: "1px solid #e5e7eb",
        ...props.style,
      }}
    >
      {props.children}
    </th>
  );
}
function Td(props: React.PropsWithChildren<{ style?: React.CSSProperties }>) {
  return <td style={{ padding: "12px 12px", ...props.style }}>{props.children}</td>;
}

/* ---------- Action icon button ---------- */
function ActionIcon(props: React.PropsWithChildren<{ title: string }>) {
  return (
    <button
      title={props.title}
      aria-label={props.title}
      style={{
        border: "1px solid #e5e7eb",
        background: "#fff",
        borderRadius: 8,
        padding: 6,
        marginRight: 6,
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        lineHeight: 0,
        transition: "background 120ms, border-color 120ms",
      }}
    >
      <span style={{ color: "#111827" }}>{props.children}</span>
    </button>
  );
}

export function IcDocument(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M7 3h6l5 5v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3z" />
      <path d="M13 3v5h5" />
    </svg>
  );
}

export function IcDownload(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 3v10" />
      <path d="M8 9l4 4 4-4" />
      <path d="M5 19h14" />
    </svg>
  );
}

export function IcDuplicate(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="7" y="7" width="10" height="10" rx="2" />
      <path d="M7 7V6a2 2 0 0 1 2-2h7" />
      <path d="M17 7h1a2 2 0 0 1 2 2v7" />
    </svg>
  );
}

export function IcTrash(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4 7h16" />
      <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
      <path d="M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12" />
      <path d="M10 11v6M14 11v6" />
    </svg>
  );
}
