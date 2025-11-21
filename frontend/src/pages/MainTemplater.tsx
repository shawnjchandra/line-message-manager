import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import TranslationButton from "../components/TranslationButton/TranslationButton";
import "../styles/templater.scss";

type Project = {
  id: string;
  title: string;
  owner: string;
  updatedAgo: string;
};

const MainTemplater: React.FC = () => {
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
    // TODO: create project
    setOpenModal(false);
  }

  return (
    <div className="templater-bg">
      {/* ganti bahasa */}
      <div className="templater-lang-switch">
        <TranslationButton />
      </div>

      {/* MAIN */}
      <main className="templater-main">
        {/* Search */}
        <section className="templater-toolbar">
  <div className="templater-search">
    <div className="templater-search-box">
      <input
        id="templater-search"
        className="templater-search-input"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={t(
          "templater.searchPlaceholder",
          "by name..."
        ) as string}
      />
    </div>
  </div>

  <div className="templater-toolbar-right">
    <span className="templater-count">
      {t("templater.templatesFound", {
        defaultValue: "{{count}} templates found",
        count: filtered.length,
      })}
    </span>

    <button
      type="button"
      className="templater-create-btn"
      onClick={() => setOpenModal(true)}
    >
      {t("templater.createTemplate", "Create new template")}
    </button>
  </div>
</section>


        {/* GRID */}
      <section className="templater-grid">
      {filtered.map((p) => (
        <article key={p.id} className="templater-card">
          <div className="templater-card-preview" />
          <div className="templater-card-body">
            <h3 className="templater-card-title">{p.title}</h3>
            <p className="templater-card-meta">
              {t("templater.cardMeta", {
                defaultValue: "{{owner}}, {{time}}",
                owner: p.owner,
                time: p.updatedAgo,
              })}
            </p>
          </div>
        </article>
      ))}
    </section>

      </main>

      {/* buat create template */}
      {openModal && (
        <>
          <div
            className="templater-modal-backdrop"
            onClick={() => setOpenModal(false)}
          />

          <div
            className="templater-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="templater-modal-title"
          >
            <h3 id="templater-modal-title" className="templater-modal-title">
              {t("templater.selectAssetType", "Select asset type")}
            </h3>

            <div className="templater-modal-body">
              <label className="templater-radio">
                <input
                  type="radio"
                  name="assetType"
                  value="card"
                  checked={assetType === "card"}
                  onChange={() => setAssetType("card")}
                />
                <span className="templater-radio-label">
                  {t("templater.card", "Card")}
                </span>
              </label>
            </div>

            <div className="templater-modal-actions">
              <button
                type="button"
                className="templater-btn templater-btn--ghost"
                onClick={() => setOpenModal(false)}
              >
                {t("common.cancel", "Cancel")}
              </button>
              <button
                type="button"
                className="templater-btn templater-btn--primary"
                disabled={!assetType}
                onClick={confirmNewProject}
              >
                {t("common.confirm", "Confirm")}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MainTemplater;
