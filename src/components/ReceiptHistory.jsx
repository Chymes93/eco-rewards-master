import React, { useState } from 'react';
import UploadRecieptNav from './UploadRecieptNav';
import MiniFooter from './MiniFooter';
import { FiSearch, FiDownload } from 'react-icons/fi';

const mockReceipts = [
  {
    id: 1,
    description: 'DESCRIPTION',
    date: '21/03/2025',
    receiptId: '123456',
    action: 'Revalidate',
    status: 'Failed',
  },
  {
    id: 2,
    description: 'DESCRIPTION',
    date: '21/03/2025',
    receiptId: '123456',
    action: 'Revalidate',
    status: 'Success',
  },
  {
    id: 3,
    description: 'DESCRIPTION',
    date: '21/03/2025',
    receiptId: '123456',
    action: 'Revalidate',
    status: 'Success',
  },
  {
    id: 4,
    description: 'DESCRIPTION',
    date: '21/03/2025',
    receiptId: '123456',
    action: 'Revalidate',
    status: 'Pending',
  },
  {
    id: 5,
    description: 'DESCRIPTION',
    date: '21/03/2025',
    receiptId: '123456',
    action: 'Revalidate',
    status: 'Failed',
  },
  {
    id: 6,
    description: 'DESCRIPTION',
    date: '21/03/2025',
    receiptId: '123456',
    action: 'Revalidate',
    status: 'Success',
  },
  {
    id: 7,
    description: 'DESCRIPTION',
    date: '21/03/2025',
    receiptId: '123456',
    action: 'Revalidate',
    status: 'Failed',
  },
  {
    id: 8,
    description: 'DESCRIPTION',
    date: '21/03/2025',
    receiptId: '123456',
    action: 'Revalidate',
    status: 'Pending',
  },
  {
    id: 9,
    description: 'DESCRIPTION',
    date: '21/03/2025',
    receiptId: '123456',
    action: 'Revalidate',
    status: 'Success',
  },
];

const statusColors = {
  Success: 'text-green-600',
  Failed: 'text-red-600',
  Pending: 'text-yellow-600',
};

const statusIcons = {
  Success: (
    <span className="inline-block w-2 h-2 rounded-full bg-green-600 mr-2"></span>
  ),
  Failed: (
    <span className="inline-block w-2 h-2 rounded-full bg-red-600 mr-2"></span>
  ),
  Pending: (
    <span className="inline-block w-2 h-2 rounded-full bg-yellow-500 mr-2"></span>
  ),
};

const PAGE_SIZE = 9;

const ReceiptHistory = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const filtered = mockReceipts.filter(
    (r) =>
      r.description.toLowerCase().includes(search.toLowerCase()) ||
      r.receiptId.includes(search) ||
      r.status.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <UploadRecieptNav />
      <main className="flex-grow w-full max-w-5xl mx-auto px-2 sm:px-6 py-8">
        <div className="bg-[#98CFA0] rounded-lg py-4 mb-8 flex items-center justify-center">
          <h1 className="text-2xl md:text-3xl font-bold text-white font-poppins text-center">
            GENERAL RECEIPT HISTORY
          </h1>
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
          <div className="flex items-center gap-2">
            <span className="font-poppins text-sm">Show</span>
            <span className="bg-[#98CFA0] text-white rounded px-2 py-1 font-semibold font-poppins text-sm">
              {filtered.length}
            </span>
            <span className="font-poppins text-sm">Entries</span>
          </div>
          <form
            className="flex w-full md:w-72 items-center relative"
            onSubmit={(e) => {
              e.preventDefault();
            }}
            role="search"
          >
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="flex-grow border-2 border-gray-400 rounded-xl py-2 px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-green-600 font-poppins text-gray-600 text-base h-10"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-6 h-6 rounded-full bg-[#228B22]">
              <FiSearch className="w-5 h-5 text-white" />
            </span>
          </form>
        </div>
        <div className="overflow-x-auto rounded-lg shadow bg-white">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-white">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  S/NO
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  DESCRIPTION
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  DATE{' '}
                  <span className="inline-block align-middle">&#8597;</span>
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  RECEIPT ID{' '}
                  <span className="inline-block align-middle">&#8597;</span>
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  ACTION
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  STATUS{' '}
                  <span className="inline-block align-middle">&#8597;</span>
                </th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {paginated.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center py-8 text-gray-400 font-poppins"
                  >
                    No receipts found.
                  </td>
                </tr>
              ) : (
                paginated.map((r, idx) => (
                  <tr key={r.id}>
                    <td className="px-4 py-3 font-poppins">
                      {(page - 1) * PAGE_SIZE + idx + 1}
                    </td>
                    <td className="px-4 py-3 font-poppins">{r.description}</td>
                    <td className="px-4 py-3 font-poppins">{r.date}</td>
                    <td className="px-4 py-3 font-poppins">{r.receiptId}</td>
                    <td className="px-4 py-3 font-poppins text-black cursor-pointer rounded-full hover:bg-green-700 hover:text-white">
                      {r.action}{' '}
                      <span className="inline-block align-middle">&#8635;</span>
                    </td>
                    <td
                      className={`px-4 py-3 font-poppins flex items-center gap-2 ${
                        statusColors[r.status]
                      }`}
                    >
                      {statusIcons[r.status]}
                      {r.status}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        className="bg-[#5BA05B] hover:bg-[#4a8a4a] text-white rounded-full p-2 transition-colors"
                        title="Download"
                      >
                        <FiDownload className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex items-center justify-end gap-2 mt-6">
          <button
            className={`px-4 py-2 rounded border font-poppins ${
              page === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-green-700 border-green-700 hover:bg-green-50'
            }`}
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            Previous
          </button>
          <span className="px-3 py-2 rounded bg-[#98CFA0] text-white font-poppins">
            {page}
          </span>
          <button
            className={`px-4 py-2 rounded border font-poppins ${
              page === totalPages
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-green-700 border-green-700 hover:bg-green-50'
            }`}
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </main>
      <MiniFooter />
      <style>{`
        @media (max-width: 640px) {
          table th, table td { padding-left: 0.5rem; padding-right: 0.5rem; font-size: 0.85rem; }
          .text-2xl { font-size: 1.25rem; }
        }
        @media (max-width: 480px) {
          .text-2xl { font-size: 1rem; }
          .font-poppins { font-size: 0.8rem; }
        }
      `}</style>
    </div>
  );
};

export default ReceiptHistory;
