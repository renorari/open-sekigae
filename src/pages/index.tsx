export default async function HomePage() {
  return (<></>);
}

export const getConfig = async () => {
  return {
    render: 'static',
  } as const;
};
