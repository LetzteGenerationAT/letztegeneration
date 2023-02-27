import Layout from "~/components/Dashboard/Layout";

function Events() {
  return <div>Events</div>;
}

Events.getLayout = function (page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Events;
