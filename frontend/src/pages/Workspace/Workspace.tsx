import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import TranslationButton from "../../components/TranslationButton/TranslationButton";
import "./Workspace.scss";
import { useHistory } from "react-router-dom";
import Project from "../../types/Project";
import { ProjectService } from "../../services/ProjectService";
import { FileService } from "../../services/FileService";
import User from "../../types/User";
import useAuthStore from "../../stores/authStore";
import { authService } from "../../services/auth";

const Workspace: React.FC = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const { isAuthenticated } = useAuthStore();

  const [projects, setProjects] = useState<Project[]>([]);
  const [userLookup, setUserLookup] = useState<Record<string, string>>({});

  // Check authentication on mount and redirect if not authenticated
  useEffect(() => {
    const isTokenValid = authService.validateToken();
    if (!isAuthenticated || !isTokenValid) {
      history.replace("/login");
      return;
    }
  }, [isAuthenticated, history]);

  useEffect(()=>{
    const loadExistingProject = async ()=>{
      try {
        const loadedProjects = await ProjectService.getAll();
      
        setProjects(loadedProjects);
      } catch (error) {
        console.error("gagal load workspace")
      }
    };

    // Only load projects if authenticated
    if (isAuthenticated && authService.validateToken()) {
      loadExistingProject();
    }
  },[isAuthenticated])

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const users = await FileService.load<User[]>("users");
        if (users) {
          const map = users.reduce<Record<number, string>>((acc, user) => {
            if (typeof user.id === "number") {
              acc[user.id] = user.username || user.email;
            }
            return acc;
          }, {});
          setUserLookup(map);
        }
      } catch (error) {
        console.error("gagal load users");
      }
    };

    loadUsers();
  }, []);

    const [q, setQ] = useState("");
    const [sortAZ, setSortAZ] = useState(false);
    const filtered = useMemo(() => {
      const s = q.trim().toLowerCase();
      let result = projects;
      
      if (s) {
        result = projects.filter((p) =>
          (p.title || "").toLowerCase().includes(s)
        );
      }
      
      if (sortAZ) {
        result = [...result].sort((a, b) => {
          const titleA = (a.title || "").toLowerCase();
          const titleB = (b.title || "").toLowerCase();
          return titleA.localeCompare(titleB);
        });
      }
      
      return result;
    }, [q, projects, sortAZ]);
  const [openModal, setOpenModal] = useState(false);
  const [assetType, setAssetType] = useState<"card" | null>(null);

  const newProject = () => {
    history.push("/editor")
  };

  const handleEdit = (id:number) => {
    history.push(`/editor/${id}`);
  }

  const formatTimestampLabel = (templateId: number | string): string => {
    const timestamp = Number(templateId);
    if (!Number.isFinite(timestamp)) {
      return t("templater.unknownTime", "Unknown time");
    }

    const date = new Date(timestamp);
    const dateLabel = date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    const timeLabel = date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    return `${dateLabel}, ${timeLabel}`;
  };

  // Don't render if not authenticated
  if (!isAuthenticated || !authService.validateToken()) {
    return null;
  }

  return (
    <div className="templater-bg">
      <div className="templater-lang-switch">
        <TranslationButton />
      </div>

      {/* MAIN */}
      <main className="templater-main">
        <section className="templater-toolbar">
          {projects.length > 0 && (
            <div className="templater-search">
              <div className="templater-search-box">
                <input
                  id="templater-search"
                  className="templater-search-input"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder={t("templater.searchPlaceholder") as string}
                />
                <button
                  type="button"
                  className={`templater-sort-btn ${sortAZ ? "templater-sort-btn--active" : ""}`}
                  onClick={() => setSortAZ(!sortAZ)}
                  title="Sort A-Z"
                >
                  A-Z
                </button>
              </div>
            </div>
          )}

  <div className="templater-toolbar-right">
    <span className="templater-count">
      {t("templater.templatesFound", {
        defaultValue: "{{count}} templates found",
        count: filtered.length,
      })}
    </span>

            {projects.length > 0 && (
              <button
                type="button"
                className="templater-create-btn"
                onClick={newProject}
              >
                {t("templater.createTemplate")}
              </button>
            )}
          </div>
        </section>

      <section className="templater-grid">
        {filtered.length === 0 ? (
          <div className="templater-empty-state">
            {projects.length === 0 ? (
              <>
                <p className="templater-empty-title">
                  {t("templater.emptyTitle") as string}
                </p>
                <button
                  type="button"
                  className="templater-create-btn templater-create-btn--large"
                  onClick={newProject}
                >
                  {t("templater.createFirstTemplate")}
                </button>
              </>
            ) : (
              <p className="templater-empty-title">
                {t("templater.noTemplateFound") as string}
              </p>
            )}
          </div>
        ) : (
          filtered.map((p) => {
            const explicitTitle =
              typeof p.title === "string" ? p.title.trim() : "";
            const projectTitle =
              explicitTitle ||
              (t("templater.untitled", "Untitled template") as string);
            const ownerLabel =
              p.ownerName ||
              (typeof p.ownerName === "string" && userLookup[p.ownerName]) ||
              (t("templater.unknownOwner", "Unknown owner") as string);
            const timeLabel = formatTimestampLabel(p.templateId);

            return (
              <article
                key={p.templateId}
                className="templater-card"
                onClick={() => handleEdit(p.templateId)}
              >
                <div className="templater-card-preview" />
                <div className="templater-card-body">
                  <h3 className="templater-card-title">{projectTitle}</h3>
                  <p className="templater-card-meta">
                    {t("templater.cardMeta", {
                      defaultValue: "{{owner}}, {{time}}",
                      owner: ownerLabel,
                      time: timeLabel,
                    })}
                  </p>
                </div>
              </article>
            );
          })
        )}
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
              {t("templater.selectAssetType", "Selfect asset type")}
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
                onClick={newProject}
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

export default Workspace;
