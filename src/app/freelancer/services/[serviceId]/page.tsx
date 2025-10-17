export default function ServiceDetailPage({
  params,
}: {
  params: { serviceId: string };
}) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Service Details
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mt-2">
        Viewing service: {params.serviceId}
      </p>
    </div>
  );
}
