import Search from './components/Search.jsx';

function App() {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-12 text-slate-100">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-emerald-400">
            GitHub REST API Explorer
          </p>
          <h1 className="text-4xl font-bold sm:text-5xl">
            Find the people behind the code
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Search by username, location, and public repository count, then
            explore enriched GitHub profiles.
          </p>
        </header>
        <Search />
      </div>
    </main>
  );
}

export default App;
