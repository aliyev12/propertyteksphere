interface IPropertyPageProps {
  params: Promise<{ id: string }>;
}

const PropertyPage = async ({ params }: IPropertyPageProps) => {
  const id = (await params).id;

  return <div>property page: {id}</div>;
};

export default PropertyPage;
