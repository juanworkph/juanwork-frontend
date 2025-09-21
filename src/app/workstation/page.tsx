export default function WorkstationPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="py-12">
          <div className="px-4 md:px-6">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Workstation Dashboard</h1>
            <p className="mt-4 text-muted-foreground">
              Welcome to the workstation dashboard. Manage your projects and users here.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
