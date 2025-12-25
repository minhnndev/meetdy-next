import { Download } from 'lucide-react';
import Navbar from '../Navbar';

interface HeaderProps {
  data?: {
    title?: string;
    appname?: string;
    description?: string;
    linkDownload?: string;
    image?: string;
  };
}

function Header({ data = {} }: HeaderProps) {
  return (
    <>
      <Navbar />
      <section className="min-h-screen flex items-center py-20 px-4" id="home">
        <div className="container mx-auto grid lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold">
              {data.title}
              <br />
              <span className="text-primary">{data.appname}</span>
            </h1>
            <p className="text-lg text-muted-foreground">{data.description}</p>
            <a
              href={data.linkDownload}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              <Download className="h-5 w-5" />
              Tải ngay phiên bản mobile
            </a>
          </div>

          <div className="flex justify-center">
            {data.image && (
              <img
                src={data.image}
                alt="App preview"
                className="max-w-full h-auto rounded-2xl shadow-2xl"
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Header;
