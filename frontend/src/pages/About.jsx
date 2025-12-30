import imageSrc1 from "../images/website-usability-testing.png";
import imageSrc2 from "../images/usabilitytesting101_final7-copy.png";

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
      {/* 1. Bölüm: Hakkımızda Giriş */}
      <section className="mb-16">
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-8 border-b-4 border-blue-500 w-max pb-2">
          Hakkımızda
        </h1>
        <div className="prose prose-lg max-w-none text-gray-700 font-serif leading-relaxed">
          <p className="mb-6">
            Merhaba ve hoş geldiniz! Biz <strong>WebTool</strong>, dijital
            dünyada kullanıcı deneyimi ve arama motoru optimizasyonu (SEO)
            konularında uzmanlaşmış bir ekip olarak sizlere hizmet veriyoruz.
            Amacımız, web sitenizin kullanılabilirliğini artırmak ve arama
            motorlarında daha üst sıralara çıkmanızı sağlamak için
            özelleştirilmiş çözümler sunmaktır.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4">
            Web Kullanılabilirliği Testi Nedir?
          </h2>
          <p>
            Web kullanılabilirliği testi, web sitenizin ziyaretçileri tarafından
            nasıl kullanıldığını anlamak ve olası kullanıcı sorunlarını
            belirlemek için yapılan bir süreçtir. Bu testler, kullanıcı
            deneyimini iyileştirmek ve web sitenizin erişilebilirliğini artırmak
            için kritik öneme sahiptir.
          </p>
        </div>
      </section>

      {/* Görsel 1 */}
      <div className="my-12 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
        <img
          src={imageSrc1}
          alt="Web Kullanılabilirlik Testi"
          className="w-full h-auto object-cover"
        />
      </div>

      {/* 2. Bölüm: SEO Bilgisi */}
      <section className="mb-16">
        <h2 className="text-3xl md:text-4xl font-bold font-serif text-gray-900 mb-6">
          SEO (Arama Motoru Optimizasyonu) Nedir?
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          SEO, web sitenizin arama motorlarında daha üst sıralarda görünmesini
          sağlayan bir dizi teknik ve stratejidir. İyi bir SEO stratejisi,
          sitenizin daha fazla organik trafik çekmesine ve hedef kitlenizle
          etkileşimi artırmasına yardımcı olur.
        </p>

        {/* SEO Metrikleri Görselleştirme Yardımı */}

        <p className="text-gray-700 text-lg leading-relaxed italic border-l-4 border-slate-300 pl-4 mt-6">
          Arama motorlarının algoritmalarının sürekli değişmesi nedeniyle, SEO
          stratejilerimiz her zaman güncel ve etkili olacak şekilde
          tasarlanmıştır.
        </p>
      </section>

      {/* Görsel 2 */}
      <div className="my-12 rounded-2xl overflow-hidden shadow-xl">
        <img
          src={imageSrc2}
          alt="SEO Stratejileri"
          className="w-full h-auto object-cover"
        />
      </div>

      {/* 3. Bölüm: Neden Biz? */}
      <section className="bg-slate-50 p-8 md:p-12 rounded-3xl border border-slate-100">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Neden Bize Güvenmelisiniz?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-700 text-lg">
          <p>
            Webtool şirketi olarak, web sitenizin başarısını artırmak için en
            son teknolojiyi ve en iyi uygulamaları kullanıyoruz. Uzman ekibimiz,
            kullanılabilirlik testleri ve SEO stratejileri konusunda geniş bir
            deneyime sahiptir.
          </p>
          <div className="flex flex-col justify-center">
            <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
              Bizimle İletişime Geçin
            </button>
          </div>
        </div>
      </section>

      <footer className="mt-16 pt-8 border-t border-gray-100 text-center text-gray-500 text-sm">
        WebTool &copy; 2025 - Dijital Çözüm Ortağınız
      </footer>
    </div>
  );
}
