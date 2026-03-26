export default function BedTable({ rows }) {
  if (!rows.length) {
    return <div className="empty-state">No bed records found for selected filter.</div>;
  }

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Hospital</th>
            <th>Ward</th>
            <th>Total</th>
            <th>Occupied</th>
            <th>Available</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td>{row.hospitalName}</td>
              <td>{row.ward}</td>
              <td>{row.totalBeds}</td>
              <td>{row.occupiedBeds}</td>
              <td className={row.availableBeds === 0 ? 'zero' : 'ok'}>{row.availableBeds}</td>
              <td>{new Date(row.updatedAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
