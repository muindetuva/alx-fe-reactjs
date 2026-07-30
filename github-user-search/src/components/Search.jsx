import { useState } from 'react';
import { searchUsers } from '../services/githubService.js';

const INITIAL_FILTERS = { username: '', location: '', minRepos: '' };

function Search() {
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [userData, setUserData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const updateFilter = (event) => {
    const { name, value } = event.target;
    setFilters((current) => ({ ...current, [name]: value }));
  };

  const runSearch = async (requestedPage, append = false) => {
    setLoading(true);
    setError(false);
    try {
      const result = await searchUsers({
        ...filters,
        page: requestedPage,
      });
      setUserData((current) =>
        append ? [...current, ...result.users] : result.users,
      );
      setTotalCount(result.totalCount);
      setPage(requestedPage);
    } catch {
      setError(true);
      if (!append) setUserData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!filters.username.trim()) return;
    runSearch(1);
  };

  const handleLoadMore = () => runSearch(page + 1, true);
  const canLoadMore = userData.length > 0 && userData.length < totalCount;

  return (
    <section aria-labelledby="search-heading">
      <h2 id="search-heading" className="sr-only">
        Search GitHub users
      </h2>
      <form
        onSubmit={handleSubmit}
        className="grid gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl md:grid-cols-[2fr_1.5fr_1fr_auto]"
      >
        <label className="grid gap-2 text-sm font-medium">
          Username
          <input
            name="username"
            value={filters.username}
            onChange={updateFilter}
            placeholder="e.g. torvalds"
            required
            className="rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Location
          <input
            name="location"
            value={filters.location}
            onChange={updateFilter}
            placeholder="e.g. Nairobi"
            className="rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Minimum repos
          <input
            type="number"
            min="0"
            name="minRepos"
            value={filters.minRepos}
            onChange={updateFilter}
            placeholder="10"
            className="rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30"
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          className="self-end rounded-lg bg-emerald-500 px-6 py-3 font-bold text-slate-950 transition hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 disabled:cursor-wait disabled:opacity-60"
        >
          Search
        </button>
      </form>

      <div aria-live="polite" className="py-6 text-center">
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-400">Looks like we cant find the user.</p>}
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {userData.map((user) => (
          <article
            key={user.id}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:-translate-y-1 hover:border-emerald-500/60"
          >
            <img
              src={user.avatar_url}
              alt={`${user.login}'s GitHub avatar`}
              className="mb-4 aspect-square w-full rounded-xl object-cover"
            />
            <h3 className="text-xl font-bold">{user.login}</h3>
            <p className="mt-2 text-sm text-slate-400">
              {user.location || 'Location not provided'}
            </p>
            <p className="mt-1 text-sm text-slate-300">
              {user.public_repos} public repositories
            </p>
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex font-semibold text-emerald-400 hover:text-emerald-300"
            >
              View profile →
            </a>
          </article>
        ))}
      </div>

      {canLoadMore && (
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={handleLoadMore}
            disabled={loading}
            className="rounded-lg border border-emerald-400 px-6 py-3 font-semibold text-emerald-300 hover:bg-emerald-400/10 disabled:opacity-60"
          >
            Load more
          </button>
        </div>
      )}
    </section>
  );
}

export default Search;
