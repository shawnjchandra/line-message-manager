import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import TranslationButton from "../../components/TranslationButton/TranslationButton";
import "./Workspace.scss";
import { useHistory } from "react-router-dom";
import Project from "../../types/Project";
import { ProjectService } from "../../services/ProjectService";
import { FileService } from "../../services/FileService";
import User from "../../types/User";

const Workspace: React.FC = () => {
  const history = useHistory();
  const { t } = useTranslation();

  // dummy data
  const [projects, setProjects] = useState<Project[]>([]);
  const [userLookup, setUserLookup] = useState<Record<number, string>>({});

  useEffect(()=>{
    const loadExistingProject = async ()=>{
      try {
        const loadedProjects = await ProjectService.getAll();
      
        setProjects(loadedProjects);
      } catch (error) {
        console.error("gagal load workspace")
      }
    };

    loadExistingProject();
  },[])

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
  // const filtered = useMemo(() => {
  //   const s = q.trim().toLowerCase();
  //   if (!s) return projects;
  //   return projects.filter((p) => p.title.toLowerCase().includes(s));
  // }, [q, projects]);

  const [openModal, setOpenModal] = useState(false);
  const [assetType, setAssetType] = useState<"card" | null>(null);

  const newProject = () => {
    history.push("/editor")
  };

  const handleEdit = (id:number) => {
    history.push(`/editor/${id}`);
  }

  return (
    <div className="templater-bg">
      <div className="templater-lang-switch">
        <TranslationButton />
      </div>

      {/* MAIN */}
      <main className="templater-main">
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
    {/* <span className="templater-count">
      {t("templater.templatesFound", {
        defaultValue: "{{count}} templates found",
        count: projects.length,
      })}
    </span> */}

    <button
      type="button"
      className="templater-create-btn"
      onClick={newProject}
    >
      {t("templater.createTemplate", "Create new template")}
    </button>
  </div>
</section>

      <section className="templater-grid">
      {projects.map((p) => {
        const firstAsset = p.assets?.[0] as any;
        const projectTitle =
          firstAsset?.data?.title ||
          t("templater.untitled", "Untitled template");
        const ownerLabel =
          p.ownerName ||
          (typeof p.userId === "number" && userLookup[p.userId]) ||
          t("templater.unknownOwner", "Unknown owner");
        const timestamp = Number(p.templateId);
        const timeLabel = Number.isFinite(timestamp)
          ? new Date(timestamp).toLocaleString()
          : t("templater.unknownTime", "Unknown time");

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
      })}
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
