import "@/app/globals.css";

type Props = {
  children: React.ReactNode;
  modal: React.ReactNode;
};

export default function RootLayout({ children, modal }: Props) {
  return (
    <html>
      <body className={`bg-slate-800`}>
        {children}
        {modal}
      </body>
    </html>
  );
}
