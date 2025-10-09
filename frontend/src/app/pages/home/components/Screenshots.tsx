function Screenshots() {
  return (
    <section className="section-container" id="screenshots">
      <div className="space-y-10">
        <div className="text-center space-y-3">
          <h3 className="section-title">Screenshots</h3>
          <p className="section-text">A look at the final user interface design. </p>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <img src="/login-page.png" className="container-card p-0" alt="conversation page screenshot" />
          <img src="/new-chat-page.png" className="container-card p-0" alt="conversation page screenshot" />
          <img src="/conversation-page.png" className="container-card p-0" alt="conversation page screenshot" />
          <img src="/profile-settings-page.png" className="container-card p-0" alt="conversation page screenshot" />
        </div>
      </div>
    </section>
  );
}

export default Screenshots;
