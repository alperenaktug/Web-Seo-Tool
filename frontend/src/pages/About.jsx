import imageSrc1 from "../images/website-usability-testing.png";
import imageSrc2 from "../images/usabilitytesting101_final7-copy.png";

export default function About() {
  return (
    <div className="flex flex-col  px-4 py-12 max-w-2xl mx-auto">
      <div>
        <h1 className="text-4xl font-serif mb-4 font-600">Hakkımızda</h1>
        <p className="mb-4 mt-8 text-slate-700 font-serif text-lg ">
          <br />
          Merhaba ve hoş geldiniz! Biz webtool şirketi, dijital dünyada
          kullanıcı deneyimi ve arama motoru optimizasyonu (SEO) konularında
          uzmanlaşmış bir ekip olarak sizlere hizmet veriyoruz. Amacımız, web
          sitenizin kullanılabilirliğini artırmak ve arama motorlarında daha üst
          sıralara çıkmanızı sağlamak için özelleştirilmiş çözümler sunmaktır.
          Web Kullanılabilirliği Testi Nedir? Web kullanılabilirliği testi, web
          sitenizin ziyaretçileri tarafından nasıl kullanıldığını anlamak ve
          olası kullanıcı sorunlarını belirlemek için yapılan bir süreçtir. Bu
          testler, kullanıcı deneyimini iyileştirmek ve web sitenizin
          erişilebilirliğini artırmak için kritik öneme sahiptir.
          Kullanılabilirlik testlerimiz, kullanıcıların sitenizi nasıl
          gezdiğini, hangi alanlarda zorlandıklarını ve hangi iyileştirmelerin
          yapılması gerektiğini belirlemek için çeşitli metodolojileri kullanır.
        </p>
      </div>
      <br />
      <img src={imageSrc1} alt="İlgili resmin açıklaması" className="mb-8" />
      <br />
      <div>
        <h1 className="text-4xl font-600 mb-4 font-serif">
          SEO (Arama Motoru Optimizasyonu) Nedir?
        </h1>
        <p className="mb-4 text-slate-700 text-lg">
          <br />
          SEO, web sitenizin arama motorlarında daha üst sıralarda görünmesini
          sağlayan bir dizi teknik ve stratejidir. İyi bir SEO stratejisi,
          sitenizin daha fazla organik trafik çekmesine ve hedef kitlenizle
          etkileşimi artırmasına yardımcı olur. Arama motorlarının
          algoritmalarının sürekli değişmesi nedeniyle, SEO stratejilerimiz her
          zaman güncel ve etkili olacak şekilde tasarlanmıştır.
        </p>
      </div>
      <br />
      <img src={imageSrc2} alt="İlgili resmin açıklaması" className="mb-8" />
      <br />
      <div>
        <h1 className="text-4xl font-600 mb-4">Neden Bize Güvenmelisiniz?</h1>
        <p className="mb-4 text-slate-700 text-lg">
          Webtool şirketi olarak, web sitenizin başarısını artırmak için en son
          teknolojiyi ve en iyi uygulamaları kullanıyoruz. Uzman ekibimiz,
          kullanılabilirlik testleri ve SEO stratejileri konusunda geniş bir
          deneyime sahiptir ve her müşterimizin ihtiyaçlarına özel çözümler
          sunar. Bizimle İletişime Geçin Web sitenizin kullanılabilirliğini
          artırmak ve arama motorlarında daha üst sıralarda yer almak için bize
          ulaşın. Profesyonel ekibimiz, size özel çözümler sunmak için burada!
        </p>
      </div>
      <br />
      <br />

      <p className="mb-4 text-slate-700 text-lg">
        Bu {"Hakkında"} sayfası, şirketinizin hizmetlerini ve uzmanlık
        alanlarını net bir şekilde tanımlar ve potansiyel müşterilere neden size
        güvenmeleri gerektiği konusunda güven verir.
      </p>
    </div>
  );
}
