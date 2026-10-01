import Shell from "@/components/Shell";

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return <Shell>{children}</Shell>;
}
