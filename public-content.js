const eventsContainer = document.getElementById("eventsContainer");
const announcementsContainer = document.getElementById("announcementsContainer");
const programsContainer = document.getElementById("programsContainer");

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function renderPublicEvents() {
  if (!eventsContainer) return;

  const events = getEvents().filter((e) => e.status !== "Completed");

  if (events.length === 0) {
    eventsContainer.innerHTML =
      '<p class="admin-panel-empty">No upcoming events yet. Check back soon!</p>';
    return;
  }

  eventsContainer.innerHTML = events
    .map((event) => {
      const d = new Date(event.date);
      const month = isNaN(d)
        ? ""
        : d.toLocaleDateString(undefined, { month: "long" });
      const day = isNaN(d) ? "" : d.getDate();
      const year = isNaN(d) ? "" : d.getFullYear();
      const photo = event.photo || "assets/event-photo.jpg";

      return `
        <div class="event-card">
          <img src="${photo}" alt="Upcoming event photo" class="event-img">

          <div class="event-info">
            <h3 class="event-title">${escapeHtml(event.title)}</h3>
          </div>

          <div class="event-date">
            <span class="event-month">${month}</span>
            <span class="event-day">${day}</span>
            <span class="event-year">${year}</span>
          </div>
        </div>
      `;
    })
    .join("");
}

function renderPublicAnnouncements() {
  if (!announcementsContainer) return;

  const announcements = getAnnouncements();

  if (announcements.length === 0) {
    announcementsContainer.innerHTML =
      '<p class="admin-panel-empty">No announcements yet. Check back soon!</p>';
    return;
  }

  announcementsContainer.innerHTML = announcements
    .map(
      (a) => `
        <div class="announcement-card">
          <div class="announcement-header">
            <h3 class="announcement-title">${escapeHtml(a.title)}</h3>
            <span class="announcement-date">${formatDateDisplay(a.date)}</span>
          </div>
          <p class="announcement-text">${escapeHtml(a.contents)}</p>
        </div>
      `
    )
    .join("");
}

renderPublicEvents();
renderPublicAnnouncements();

function renderPublicPrograms() {
  if (!programsContainer) return;

  const programs = getPrograms();

  if (programs.length === 0) {
    programsContainer.innerHTML =
      '<p class="admin-panel-empty">No programs posted yet. Check back soon!</p>';
    return;
  }

  programsContainer.innerHTML = programs
    .map(
      (p) => `
        <div class="program-card">
          <img src="${p.image}" alt="Program poster">
        </div>
      `
    )
    .join("");
}

renderPublicPrograms();
