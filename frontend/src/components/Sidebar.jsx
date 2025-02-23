
const Sidebar = () => (
    <div className="sticky-top">
      <div className="card mb-4">
        <div className="card-body">
          <h5>Your Activity</h5>
          <ul>
            <li><a href="#">Friends</a></li>
            <li><a href="#">Groups</a></li>
            <li><a href="#">Events</a></li>
          </ul>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <h5>Suggestions</h5>
          <ul>
            <li><a href="#">Follow John Doe</a></li>
            <li><a href="#">Follow Jane Smith</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
export default Sidebar;