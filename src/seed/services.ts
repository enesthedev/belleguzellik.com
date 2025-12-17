import type { Payload } from 'payload'

import { turkishToSlug } from '@/utils'

import { getOrCreateMedia, MEDIA_ASSETS } from './media'
import type { ServiceSeedData } from './types'
import { createRichTextContent } from './utils'

export const SEED_SERVICES: ServiceSeedData[] = [
  {
    name: 'Profesyonel Saç Hizmetleri',
    description:
      'Kesim, boya, saç bakım tedavileri, keratin, perma ve daha fazlası - tüm saç ihtiyaçlarınız için kapsamlı çözümler sunuyoruz.',
    duration: 120,
    image: {
      filename: MEDIA_ASSETS.haircut.filename,
      alt: 'Profesyonel Saç Hizmetleri',
      mimeType: MEDIA_ASSETS.haircut.mimeType,
    },
    richTextParagraphs: [
      'Modern yaşamda saçlarımız, kimliğimizin ve stilimizin en görünür yansımasıdır. Belle Güzellik Merkezi olarak, saç bakımını sadece estetik bir işlem olarak görmüyoruz; her müşterimizin saç sağlığını ve güzelliğini ön planda tutarak, kişiye özel çözümler sunuyoruz. Saç hizmetlerimiz, yıllarca deneyimli uzman kuaförlerimiz, en son teknolojiyle donatılmış salonumuz ve dünya standartlarında ürünlerimizle sektörde fark yaratıyor.',
      "Saç kesimi hizmetimizde, yüz şekli analizi ile başlayan bir süreç uyguluyoruz. Her yüz şekli farklı kesim teknikleri gerektirir. Oval, yuvarlak, kare, kalp veya elmas yüz şekline sahip olmanız fark etmeksizin, kemik yapınızı, saç dokunuzu ve yaşam tarzınızı dikkate alarak size en uygun kesimi öneriyoruz. Uzman kuaförlerimiz, klasik düz kesimden katmanlı kesimlere, pixie'den long bob'a kadar her stilde ustadır.",
      'Saç boyama konusunda Belle Güzellik olarak en güncel teknikleri ve en kaliteli ürünleri kullanıyoruz. Amonyaksız boya formüllerimiz, saçınıza zarar vermeden istediğiniz renge ulaşmanızı sağlar. Balayaj, ombre, sombre, highlights, lowlights gibi modern boyama teknikleriyle doğal ve canlı görünümler yaratıyoruz. Tek ton boyadan radikal renk değişimlerine kadar tüm isteklerinizi saç sağlığınızı koruyarak gerçekleştiriyoruz.',
      'Saç bakım tedavilerimiz, hasarlı, yıpranmış ve cansız saçları yeniden canlandırmak için özel olarak tasarlanmıştır. Keratin bakımı, saç tellerinin yapısını güçlendirerek pürüzsüz, parlak ve kolay şekillendirilebilir saçlar elde etmenizi sağlar. Protein bakımı, ince ve zayıf saçlara hacim ve dayanıklılık kazandırır. Onarıcı maskelerimiz, derin nemlendirme ve beslenme sağlayarak saç derisinden uçlara kadar sağlıklı saçlar sunar.',
      'Özel tedavilerimiz arasında Brezilya föni, saç botoksu ve perma uygulamaları bulunmaktadır. Brezilya föni, kıvırcık ve elektriklenen saçları düzleştirerek aylarca süren pürüzsüz bir görünüm sağlar. Saç botoksu, yaşlanma ve hasar belirtilerini azaltarak saçlarınızı içten dışa yeniler. Perma uygulamalarımız ise düz saçlara doğal dalgalar veya kıvırcık bir görünüm kazandırır.',
      "Kullandığımız profesyonel markalar arasında L'Oréal Professionnel, Wella Professionals, Schwarzkopf Professional, Kerastase ve Olaplex gibi dünya çapında güvenilir isimler yer alıyor. Bu markaların ürünleri, saç sağlığını korurken istediğiniz sonuçlara ulaşmanızı garantiler. Özellikle hassas saçlar ve alerjik reaksiyonlar için organik ve doğal içerikli alternatifler de sunuyoruz.",
      'Her hizmette detaylı bir saç analizi yapıyoruz. Saç tipiniz (ince, kalın, normal), saç yapınız (düz, dalgalı, kıvırcık), yağlanma eğiliminiz, hasar seviyeniz ve saç derisi durumunuz gibi faktörleri değerlendirerek size özel bir bakım planı oluşturuyoruz. Bu kişiselleştirilmiş yaklaşım, en iyi sonuçları almanızı sağlar.',
      'Saçınızın hangi problemle karşı karşıya olduğunu belirleyerek doğru tedaviyi uyguluyoruz. Saç dökülmesi için güçlendirici ampul tedavileri, kepek problemi için özel şampuan ve tonikler, renk solması için renk koruyucu tedaviler sunuyoruz. Her problemin kendine özgü çözümü vardır ve uzman ekibimiz bu konuda size rehberlik eder.',
      "Belle Güzellik'teki yıkama deneyimi, başlı başına bir terapi seansıdır. Profesyonel yıkama teknikleriyle saç derinize yapılan masaj, kan dolaşımını artırarak saç köklerini besler. Özel yıkama koltuklarımızda rahat bir pozisyonda, sıcaklığı ayarlanmış suyla ve size uygun şampuan-saç kremiyle yapılan yıkama, hem temizlik hem de rahatlama sağlar.",
      'Isı koruyucu ürünler, fön, düzleştirme makinesi veya maşa kullanımından önce mutlaka uygulanır. Yüksek ısı, saç tellerine zarar verebilir; ancak doğru koruma ile hem sağlıklı saçlar hem de mükemmel şekillendirme mümkündür. Son işlem olarak saç tipinize uygun serum, yağ veya sprey ile saçlarınızı parlatıyor ve şekli sabitlestiriyoruz.',
      'Uzman kuaför ekibimiz, düzenli olarak ulusal ve uluslararası eğitimlere katılarak kendilerini geliştiriyor. Moda trendlerini yakından takip ediyor, yeni teknikleri öğreniyor ve sertifikalarını yeniliyorlar. Bu sayede size her zaman en güncel ve en kaliteli hizmeti sunabiliyoruz.',
      "Belle Güzellik'te saç hizmetleri, sadece bir randevu değil, kendinize ayırdığınız özel bir zamandır. Konforlu salonumuz, samimi atmosferimiz ve size özel yaklaşımımızla her ziyaretinizde kendinizi değerli hissedeceksiniz. Saçlarınız için en iyisini hak ediyorsunuz ve biz de size bunu sunuyoruz.",
    ],
    features: [
      {
        icon: 'Ruler',
        title: 'Yüz Şekli Analizi',
        description:
          'Her müşterimize özel yüz şekli ve kemik yapısı analizi yaparak en uygun saç kesimi ve stili öneriyoruz. Saç dokunuz, yaşam tarzınız ve kişisel tercihleriniz dikkate alınarak kişiye özel çözümler üretilir.',
      },
      {
        icon: 'Sparkles',
        title: 'Premium Profesyonel Ürünler',
        description:
          "L'Oréal Professionnel, Wella, Schwarzkopf, Kerastase ve Olaplex gibi dünya standartlarında markaların profesyonel ürünlerini kullanıyoruz. Amonyaksız, saç dostu ve dermatololojik olarak test edilmiş formüller.",
      },
      {
        icon: 'Layers',
        title: 'Çok Yönlü Hizmet Yelpazesi',
        description:
          'Kesim, boya, balayaj, ombre, keratin bakımı, protein tedavisi, Brezilya föni, saç botoksu, perma ve daha fazlası. Tüm saç ihtiyaçlarınız için tek adres. İster doğal ister radikal bir değişim isteyin, her stile hazırız.',
      },
      {
        icon: 'GraduationCap',
        title: 'Uzman ve Deneyimli Kuaför Kadrosu',
        description:
          'Yıllarca deneyime sahip, düzenli ulusal ve uluslararası eğitimler alan, moda trendlerini yakından takip eden kuaförlerimiz. Sertifikalı profesyonellerden hizmet alarak güvende olduğunuzu bileceksiniz.',
      },
      {
        icon: 'HeartPulse',
        title: 'Saç Sağlığı Önceliğimiz',
        description:
          'Estetik kadar saç sağlığını da önemsiyoruz. Her işlemde ısı koruyucu ürünler, onarıcı tedaviler ve bakım protokolleri uygularız. Güzel görünüm, sağlıklı saçlarla başlar ve biz her iki hedefe de ulaşmanızı sağlarız.',
      },
      {
        icon: 'User',
        title: 'Tamamen Kişiselleştirilmiş Yaklaşım',
        description:
          'Hiçbir saç diğeriyle aynı değildir. Saç tipiniz, yapınız, hasar seviyeniz, yaşam tarzınız ve hedefleriniz analiz edilerek size özel bakım planı oluşturulur. Her ziyaretinizde gelişiminiz takip edilir.',
      },
    ],
    richTextParagraphsAfterFeatures: [
      'İşlem sonrası evde bakım, saç sağlığınızı korumak ve sonuçların uzun süre devam etmesi için kritiktir. Kullandığınız şampuan ve saç kremi, saç tipinize uygun olmalıdır. Yağlı saçlar için hafif ve dengeleyici, kuru saçlar için besleyici ve nemlendirici ürünler tercih edilmelidir. Yıkama sıklığınız da saç tipinize göre ayarlanmalı; genellikle haftada 2-3 kez yıkamak idealdir.',
      'Boya sonrası renk koruma çok önemlidir. Sülfatsız ve renk koruyucu şampuanlar, boyalı saçlar için özel olarak formüle edilmiştir ve rengin solmasını önler. Saçlarınızı soğuk veya ılık suyla durulayın; sıcak su, rengin daha hızlı solmasına neden olur. Isı araçlarını kullanmadan önce mutlaka ısı koruyucu sprey uygulayın. Güneş ışınları da rengi soldurabilir, bu nedenle yazın UV korumalı ürünler kullanın.',
      'Kesim sonrası şekilinizi korumak için doğru fön teknikleri öğrenmelisiniz. Saçınızı fazla ısıtmadan, orta-düşük ısı ayarlarında kurutmak daha sağlıklıdır. Hafif tutucu ürünler (sprey, köpük) kullanarak şeklinizi sabitleştirebilirsiniz. Aşırı ağır jel veya mumlar saça yapışık bir görünüm verir. Kesim şeklinizi korumak için düzenli olarak uç aldırmayı unutmayın; 6-8 haftada bir kontrol önerilir.',
      'Keratin veya derin bakım sonrası ilk 48-72 saat kurallarına dikkat edin. Bu süre içinde saçınızı yıkamamalı, bağlamamalı ve kulak arkanıza atmamalısınız. Suya temas, terleme veya nemlendirme işlemi bozabilir. Bu kurallara uyarak bakımın ömrünü 3-6 ay boyunca uzatabilirsiniz. Düzenli olarak sülfatsız şampuanlar ve nem dengeleyici kremler kullanarak etkiyi muhafaza edin.',
      'Kaç haftada bir bakıma gelmelisiniz? Saç kesimi için genellikle 6-8 hafta idealdir, özellikle kısa kesimler için bu süre 4-6 haftaya düşebilir. Saç boyası için 4-6 hafta; kök boyası daha sık, tam boya daha seyrek yapılır. Saç bakım tedavileri (keratin, protein, maske) ise ayda bir uygulandığında en iyi sonuçları verir. Özel durumlarınıza göre kuaförünüz sizin için ideal takvimi oluşturacaktır.',
      'Kombinasyon hizmet paketlerimizden faydalanabilirsiniz. Kesim + boya kombinasyonu, hem zaman hem de maliyet açısından avantajlıdır. Özel gün hazırlıkları için kesim + boya + keratin + profesyonel saç makyajı paketimiz mevcut. Düğün, mezuniyet, özel davet gibi organizasyonlar öncesi erken randevu alarak en iyi hizmeti alabilirsiniz.',
      'Dikkat edilmesi gereken bazı durumlar vardır. Yeni boya sonrası deniz veya havuza girmek, rengin solmasına ve yeşil tonlar oluşmasına neden olabilir. Mümkünse ilk 1-2 hafta denizden uzak durun; girmek zorundaysanız koruyucu yağ veya silikon bazlı spreyle saçınızı kaplayın. Hamilelik döneminde boya konusunda endişeleriniz varsa, amonyaksız veya organik boyalarla güvenle hizmet alabilirsiniz; ancak doktorunuza danışmanızı öneririz.',
      'Randevu öncesi hazırlık konusunda en çok sorulan sorulardan biri: Temiz mi yoksa kirli saç mı gelmeli? Genellikle temiz veya bir gün önce yıkanmış saçla gelmek idealdir. Ancak saç boyası için bazı durumlarda 1-2 gün yıkamamış saç daha iyidir çünkü saç derisinin doğal yağları koruma sağlar. Kesim için süre olarak 1-1.5 saat, boya için 2-3 saat, keratin için 3-4 saat ayırmalısınız. İlk ziyaretinizde ücretsiz konsültasyon yaparak ihtiyaçlarınızı belirleyebiliriz.',
    ],
  },
  {
    name: '4 Mevsim Lazer Epilasyon',
    description:
      'Yıl boyunca güvenle uygulanabilen, kalıcı kıl azaltma sağlayan gelişmiş lazer epilasyon teknolojisi ile pürüzsüz cilde kavuşun.',
    duration: 45,
    image: {
      filename: MEDIA_ASSETS.laserEpilation.filename,
      alt: '4 Mevsim Lazer Epilasyon',
      mimeType: MEDIA_ASSETS.laserEpilation.mimeType,
    },
    richTextParagraphs: [
      'Lazer epilasyon, istenmeyen tüylerden kalıcı olarak kurtulmanın en etkili ve bilimsel olarak kanıtlanmış yöntemidir. Belle Güzellik Merkezi olarak kullandığımız 4 Mevsim lazer teknolojisi, geleneksel lazer sistemlerinin aksine yılın her döneminde güvenle uygulanabilir. Bu teknoloji, melanin pigmentini hedef alan akıllı bir sistem kullanarak kıl kökünü etkisiz hale getirir ve yeni kıl oluşumunu önler.',
      'Lazer epilasyonun çalışma prensibi, yoğun ışık enerjisinin kıl kökündeki melanin pigmenti tarafından emilmesine dayanır. Bu enerji, kıl folikülünü ısıtarak hasar verir ve kılın yeniden büyümesini engeller. Her kıl, büyüme döngüsünün anagen (aktif büyüme) fazında olduğunda lazer tedavisine en iyi yanıt verir. Bu nedenle birden fazla seans gereklidir; çünkü tüm kıllar aynı anda aynı fazda değildir.',
      '4 Mevsim teknolojisinin en büyük avantajı, özel soğutma sistemi ve dalga boyu ayarlaması sayesinde açık tenden esmer tene kadar tüm cilt tonlarında güvenle uygulanabilmesidir. Geleneksel lazer sistemleri güneş almış veya koyu tenli kişilerde yanık riski taşırken, bizim sistemimiz bu riski minimize eder. Yaz aylarında bile güneş koruyucu kullanarak epilasyon yaptırabilirsiniz.',
      "Belle Güzellik'te kullandığımız lazer cihazı, FDA onaylı ve CE sertifikalı profesyonel bir sistemdir. Cihazımız, diyot lazer teknolojisi ile 808nm dalga boyunda çalışarak hem ince hem de kalın kıllarda etkili sonuçlar verir. Soğutma sistemi, işlem sırasında cildi korur ve konforu artırır. Düzenli bakım ve kalibrasyon ile cihazımız her zaman optimum performansta çalışır.",
      'Lazer epilasyon, vücudun hemen hemen her bölgesine uygulanabilir. Yüz bölgesi (üst dudak, çene, yanaklar), kol altı, bikini hattı ve tam bikini, bacaklar, kollar, sırt, göğüs, karın ve parmaklar en sık uygulanan bölgelerdir. Her bölge için özel ayarlar ve protokoller uygulanır. Hassas bölgelerde daha düşük enerji ve daha fazla seans tercih edilirken, bacak gibi geniş alanlarda yüksek enerji ile hızlı uygulama yapılır.',
      'İlk seansta, küçük bir test bölgesinde cilt tepkisi değerlendirilir. Cilt tipiniz, kıl yapınız ve renginiz analiz edilerek size özel lazer ayarları belirlenir. İlk birkaç seansta kıl yoğunluğunda belirgin azalma gözlenirken, 6-8 seans sonunda kalıcı sonuçlar elde edilir. Her seansta kalan kıllar daha ince ve seyrek olarak çıkar.',
      'Kıl döngüsü nedeniyle seanslar arasında genellikle 4-8 hafta beklenir. Yüz bölgesinde kıl döngüsü daha kısa olduğundan seanslar daha sık (4-6 hafta), vücut bölgelerinde ise daha seyrek (6-8 hafta) planlanır. Toplam tedavi süreci genellikle 6-10 ay arasında tamamlanır. Hormonal faktörler, bazı bölgelerde ek seanslar gerektirebilir.',
      'Farklı cilt ve kıl tiplerinde sonuçlar değişkenlik gösterebilir. En iyi sonuçlar, açık tenli ve koyu kıllı kişilerde alınır çünkü kontrast yüksektir. Ancak 4 Mevsim teknolojimiz, koyu tenli kişilerde de güvenle kullanılabilir. İnce ve açık renkli kıllarda (sarı, kızıl, beyaz) lazer tedavisi daha az etkilidir; bu durumda daha fazla seans gerekebilir.',
      'Lazer epilasyonun geleneksel yöntemlere göre sayısız avantajı vardır. Ağda veya şekerleme gibi yöntemlerden farklı olarak ağrısız veya minimal ağrılıdır, batık kıl problemi oluşturmaz ve kalıcı sonuç verir. Jilete kıyasla cilt tahriş etmez, kılların daha kalın çıkmasına neden olmaz ve zaman kazandırır. Bir kez tamamlandığında, yıllar boyunca pürüzsüz cilt keyfini çıkarabilirsiniz.',
      "Belle Güzellik'te güvenlik standartları en üst düzeydedir. Tüm operatörlerimiz sertifikalı lazer eğitimi almıştır. Her işlem öncesi detaylı konsültasyon yapılır, kontrendikasyonlar değerlendirilir. Göz koruyucu gözlükler hem müşteri hem de operatör tarafından kullanılır. Hijyen protokollerimiz, tek kullanımlık malzemeler ve sterilizasyon prosedürleri ile desteklenir.",
      'İşlem öncesi ve sonrası bakım protokolü, sonuçların kalitesini doğrudan etkiler. İşlemden 2 hafta önce güneşten kaçınmalı, 24-48 saat önce bölgeyi traş etmelisiniz. İşlem sonrası 48 saat sıcak duş, sauna, havuz ve güneşten kaçınmalısınız. SPF 30+ güneş koruyucu günlük kullanılmalıdır. Bu kurallara uyarak hem güvenliği hem de sonuçların kalitesini artırırsınız.',
      'Lazer epilasyon sonrası kalıcılık oranı %80-90 arasındadır. Kalan %10-20 kıl, genellikle çok ince ve açık renkte olup fark edilmez seviyededir. Hormonal değişiklikler (hamilelik, menopoz, PCOS) nedeniyle bazı bölgelerde yeni kıl çıkışı olabilir; bu durumda yılda 1-2 bakım seansı yeterlidir. Kalıcı sonuçlarla yıllar boyunca pürüzsüz cilt keyfini sürdürebilirsiniz.',
    ],
    features: [
      {
        icon: 'Sun',
        title: 'Yıl Boyunca Güvenli Uygulama',
        description:
          'Gelişmiş 4 Mevsim teknolojimiz sayesinde yazın da güvenle lazer epilasyon yaptırabilirsiniz. Özel soğutma sistemi ve dalga boyu ayarlaması ile güneş almış ciltlerde bile güvenle uygulanır. Güneş koruyucu ile yıl boyu epilasyon mümkün.',
      },
      {
        icon: 'Palette',
        title: 'Her Cilt Tonunda Etkili',
        description:
          'Açık tenden esmer tene kadar tüm cilt tonlarında güvenli ve etkili sonuçlar. Melanin hedefli akıllı lazer sistemi, cilt tipinize göre otomatik ayarlanır. Koyu tenli müşterilerimiz de güvenle hizmet alabilir.',
      },
      {
        icon: 'Snowflake',
        title: 'Ağrısız Konfor Teknolojisi',
        description:
          'Entegre soğutma sistemli lazer başlığı, işlem sırasında cildi korur ve konfor sağlar. Çoğu müşterimiz sadece hafif bir sıcaklık hisseder. Hassas bölgelerde lokal anestezik krem seçeneği de mevcuttur.',
      },
      {
        icon: 'Zap',
        title: 'Hızlı ve Verimli Uygulama',
        description:
          'Geniş lazer başlığı ile büyük alanlar (tam bacak, sırt) 30-45 dakikada işlenir. Üst dudak sadece 5 dakika, kol altı 10 dakika sürer. Yoğun tempoya sahip müşterilerimiz için öğle arası seansları mümkün.',
      },
      {
        icon: 'CheckCircle',
        title: 'Kalıcı Pürüzsüzlük',
        description:
          '6-8 seans sonunda %80-90 oranında kalıcı kıl azalması. Kalan ince tüyler fark edilmez seviyede. Ağda, jilet veya diğer geçici yöntemlerden kalıcı olarak kurtulun. Yıllar boyunca pürüzsüz cilt keyfini çıkarın.',
      },
      {
        icon: 'Stethoscope',
        title: 'Profesyonel Takip ve Danışmanlık',
        description:
          'Her seans öncesi cilt kontrolü ve lazer ayarı optimizasyonu yapılır. Seans arası gelişiminiz takip edilir. Cilt tipinize özel bakım önerileri ve ev bakım protokolü sunulur. Uzman ekibimiz tüm sorularınızı yanıtlar.',
      },
    ],
    richTextParagraphsAfterFeatures: [
      'İşlem sonrası ilk 48 saat kritik öneme sahiptir. Bu süre içinde sıcak duş, hamam, sauna ve buhar banyosundan kaçınmalısınız. Havuz ve deniz suyu da cildi tahriş edebilir. Güneşe doğrudan maruz kalmaktan kaçının ve SPF 30+ güneş koruyucu kullanın. Sıkı giysiler yerine bol ve pamuklu kıyafetler tercih edin. Bu önlemler, olası cilt reaksiyonlarını minimize eder.',
      'Seanslar arası dönemde kıl çıkışı olması normaldir; bu dönemde sadece jilet kullanabilirsiniz. Ağda, şekerleme veya cımbız kullanmak kesinlikle yasaktır çünkü bu yöntemler kıl kökünü çekerek lazer tedavisinin etkinliğini azaltır. Epilasyon kremi de cilt tahriş edebileceğinden önerilmez. Çıkan kılları nazikçe traş edin ve bir sonraki seansınızı bekleyin.',
      'Sonuçların görülme süreci kişiden kişiye değişir. İlk seans sonrası 1-2 hafta içinde işlem görmüş kıllar dökülmeye başlar. 3. seans sonrası belirgin azalma, 6-8 seans sonrası kalıcı sonuçlar elde edilir. Hormonal faktörler, kıl yapısı ve tedavi edilen bölge, sonuç süresini etkiler. Sabırlı olmak ve tüm seansları tamamlamak önemlidir.',
      'Bölgelere göre seans sayıları farklılık gösterir. Yüz bölgesi (üst dudak, çene) 6-8 seans, kol altı 6-8 seans, bikini hattı 6-8 seans, tam bacak 8-10 seans, kollar 6-8 seans gerektirir. Hormon etkili bölgeler (çene, üst dudak) ve kalın kıllı bölgeler daha fazla seans gerektirebilir. Kişisel değerlendirme sonucu size özel bir plan oluşturulur.',
      'Lazer epilasyonu diğer hizmetlerimizle kombinleyebilirsiniz. Epilasyon sonrası Hydrafacial ile cildinizi yenileyebilirsiniz (aynı gün değil, 1 hafta sonra). Özel gün öncesi epilasyon + cilt bakımı paketi popüler tercihlerimiz arasında. Tüm vücut bakım paketlerimizle kapsamlı bir güzellik deneyimi yaşayabilirsiniz.',
      'Bazı durumlar lazer epilasyon için kontrendikasyon oluşturur. Hamilelik ve emzirme döneminde uygulanmaz. PCOS hastalarında hormonal tedavi eş zamanlı önerilir. Epilepsi, kalp pili ve aktif cilt enfeksiyonlarında dikkatli olunmalı. Fotosensitif ilaç kullananlar (bazı antibiyotikler, retinoidler) işlemden önce doktorlarına danışmalı. Konsültasyonumuzda tüm sağlık geçmişiniz değerlendirilir.',
      'Randevu öncesi hazırlık işlemin başarısını etkiler. İşlemden 1 gün önce tedavi edilecek bölgeyi traş edin; çok kısa veya uzun kıllar ideal değildir. Krem, losyon, deodorant veya parfüm kullanmadan gelin. Makyajsız gelin (yüz uygulaması için). Son 2 haftada yoğun güneşlenmeden kaçının. Konsültasyon randevunuzda size özel hazırlık talimatları verilecektir.',
      'Mevsimsel öneriler açısından, kış aylarında lazer epilasyona başlamak idealdir. Güneşe maruziyetin az olduğu bu dönemde tedavi daha güvenli ve rahat olur. Yaz öncesi pürüzsüz cilt için en az 3-4 ay önce (Ocak-Şubat) başlamanızı öneriyoruz. Ancak 4 Mevsim teknolojimiz sayesinde yazın da güvenle devam edebilirsiniz. Yaz tatili veya düğün öncesi planlama için erken randevu alın.',
    ],
  },
  {
    name: 'Hydrafacial Cilt Bakımı',
    description:
      'Patentli vakum teknolojisi ile derin temizlik, eksfoliasyon ve serum infüzyonunu tek seansta birleştiren premium cilt yenileme tedavisi.',
    duration: 60,
    image: {
      filename: MEDIA_ASSETS.facialMask.filename,
      alt: 'Hydrafacial Cilt Bakımı',
      mimeType: MEDIA_ASSETS.facialMask.mimeType,
    },
    richTextParagraphs: [
      'Hydrafacial, cilt bakımında devrim yaratan, dünya çapında milyonlarca kişinin tercih ettiği premium bir tedavi sistemidir. Geleneksel yüz bakımlarından farklı olarak, Hydrafacial patentli Vortex-Fusion teknolojisi kullanarak tek seansta temizlik, eksfoliasyon, ekstraksiyon ve hidrasyon işlemlerini birleştirir. Belle Güzellik Merkezi olarak orijinal Hydrafacial cihazı ve serumlarıyla size bu eşsiz deneyimi sunuyoruz.',
      "Hydrafacial'ın çalışma prensibi, spiral tasarımlı özel başlıkların vakum etkisiyle cildi nazikçe eksfoliye ederken, aynı anda aktif serumları cilde infüze etmesine dayanır. Bu Vortex-Fusion teknolojisi, gözenekleri sıkıştırmadan açar, kir ve siyah noktaları çıkarır ve cildi besleyici serumlarla doyurur. Tüm bu işlemler tek seansta, ağrısız ve konforlu bir şekilde gerçekleşir.",
      'Tedavi üç ana aşamadan oluşur. İlk aşamada temizlik ve hafif peeling yapılarak cildin üst tabakasındaki ölü hücreler ve yüzeysel kirler temizlenir. İkinci aşamada vakum etkisiyle gözeneklerdeki siyah noktalar, sebum ve kirler çıkarılır (ekstraksiyon). Üçüncü aşamada cildinize özel seçilmiş aktif serumlar infüze edilir, antioksidanlar, peptidler ve hyaluronik asit ile cildiniz beslenir ve nemlendirilir.',
      "Hydrafacial'da kullanılan serum kokteylleri, cilt tipinize ve hedeflerinize göre özelleştirilir. Antioksidan serumlar serbest radikallere karşı koruma sağlar. Hyaluronik asit derin nemlendirme sunar. Peptid kompleksleri yaşlanma belirtilerini hedefler. Salisilik asit yağlı ve akneye eğilimli ciltler için idealdir. Aydınlatıcı serumlar ise leke ve ton eşitsizliklerine etkilidir.",
      'Hydrafacial, tüm cilt tipleri ve yaşlar için uygundur. Yağlı ve akneye eğilimli ciltlerde gözenekleri temizler ve sebum dengesini sağlar. Kuru ciltlerde derin nemlendirme sunar. Hassas ciltlerde nazik formüller kullanılır. Olgun ciltlerde yaşlanma karşıtı serumlarla kırışıklıklar ve elastikiyet kaybı hedeflenir. Karma ciltlerde bölgesel ihtiyaçlara göre farklı serumlar uygulanabilir.',
      "Hydrafacial'ın en büyük avantajlarından biri anında sonuç vermesidir. İşlem sonrası cildiniz hemen daha parlak, nemli ve sağlıklı görünür. Kızarıklık veya pullanma olmadığından, özel günlerinizden hemen önce bile yaptırabilirsiniz. Düğün, mezuniyet, önemli toplantı veya fotoğraf çekimi öncesi ideal bir seçimdir. Makyaj hemen uygulanabilir.",
      "Belle Güzellik'te Hydrafacial protokolümüz, cilt analiziyle başlar. Özel cihazımızla cildinizin nem seviyesi, yağlanma durumu, gözenek yapısı ve hasar seviyesi ölçülür. Bu verilere göre size özel serum kombinasyonu belirlenir. İşlem boyunca rahat koltuklarımızda, sakin bir ortamda profesyonel bakım alırsınız. Sonuçlar fotoğraflanarak tedavi öncesi-sonrası karşılaştırma yapılır.",
      'Kullandığımız Hydrafacial cihazı ve serumları %100 orijinal ve sertifikalıdır. Sahte veya muadil ürünler kullanmıyoruz. Her seans için tek kullanımlık başlıklar kullanılır, hijyen standartlarımız en üst düzeydedir. Orijinal serumlar, klinik çalışmalarla kanıtlanmış etkinliğe sahiptir ve cilt güvenliği test edilmiştir.',
      'Uzman estetisyenlerimiz, Hydrafacial uygulama sertifikasına sahiptir. Düzenli eğitimlerle kendilerini güncellerler. Cilt fizyolojisi, serum bileşimleri ve uygulama teknikleri konusunda derinlemesine bilgiye sahiptirler. Her müşteriye özel yaklaşım, güvenlik protokolleri ve sonuç odaklı tedavi planları sunarlar.',
      "Hydrafacial'ın etkinliği klinik çalışmalarla kanıtlanmıştır. Araştırmalar, tek seansta gözenek görünümünde %30'a varan azalma, nem seviyesinde %30'a varan artış göstermiştir. Düzenli uygulamalarda ince çizgiler ve lekeler belirgin şekilde azalır. Dermatolojik testler, tüm cilt tiplerinde güvenli olduğunu doğrulamıştır.",
      'Hydrafacial, diğer estetik tedavilerle kombine edilebilir. LED terapi ile birlikte uygulandığında etki güçlenir. Lazer tedavileri veya kimyasal peeling öncesi cilt hazırlığı için idealdir. Botoks veya dolgu sonrası bakım olarak da uygulanabilir. Uzmanlarımız, size en uygun kombinasyon tedavisini önerecektir.',
      'Düzenli Hydrafacial bakımı, uzun vadede ciddi faydalar sağlar. Ayda bir uygulama, cilt dokusunu ve tonunu iyileştirir, yaşlanma sürecini yavaşlatır. Gözenekler küçülür, sivilce ve siyah nokta oluşumu azalır. Cilt daha aydınlık, daha esnek ve daha sağlıklı görünür. Hydrafacial, cilt sağlığınız için uzun vadeli bir yatırımdır.',
    ],
    features: [
      {
        icon: 'Wind',
        title: 'Patentli Vortex-Fusion Teknolojisi',
        description:
          'Spiral tasarımlı başlıklar, vakum etkisiyle cildi nazikçe eksfoliye ederken aynı anda aktif serumları infüze eder. Gözenekleri sıkıştırmadan temizler, tek seansta derin bakım sağlar. Dünyada 10 milyondan fazla uygulama.',
      },
      {
        icon: 'Sparkles',
        title: 'Anında Görünür Sonuçlar',
        description:
          'İşlem sonrası hemen daha parlak, nemli ve sağlıklı cilt. Kızarıklık veya pullanma olmaz, makyaj hemen uygulanabilir. Özel günlerinizden hemen önce bile güvenle yaptırabilirsiniz. Farkı ilk seansta görün.',
      },
      {
        icon: 'Users',
        title: 'Tüm Cilt Tiplerine Uygun',
        description:
          'Yağlı, kuru, karma, hassas veya olgun cilt - her cilt tipi için özelleştirilmiş serum kombinasyonları. Akneye eğilimli ciltlerde güvenle uygulanır. Hamilelik dışında herkes için uygundur.',
      },
      {
        icon: 'Beaker',
        title: 'Özelleştirilmiş Serum Kokteylleri',
        description:
          'Cilt analizine göre seçilen aktif içerikler: antioksidanlar, hyaluronik asit, peptidler, aydınlatıcılar. Her müşteriye özel formül. Orijinal ve klinik olarak test edilmiş serumlar kullanılır.',
      },
      {
        icon: 'Shield',
        title: 'Güvenli ve Ağrısız Deneyim',
        description:
          'Non-invaziv tedavi, iğne veya cerrahi müdahale yok. Tamamen ağrısız, çoğu müşteri rahatlatıcı bulur. Dermatolojik testlerle güvenliği kanıtlanmış. Yan etki riski minimumdur.',
      },
      {
        icon: 'Award',
        title: 'Sertifikalı Orijinal Sistem',
        description:
          'FDA onaylı, CE sertifikalı orijinal Hydrafacial cihazı. %100 orijinal serumlar, tek kullanımlık hijyenik başlıklar. Sertifikalı estetisyenler tarafından uygulama. Kalite garantisi.',
      },
    ],
    richTextParagraphsAfterFeatures: [
      'İşlem sonrası ilk 24 saat dikkat edilmesi gereken bir dönemdir. Yoğun güneş ışığından kaçının ve SPF 30+ güneş koruyucu kullanın. Ağır makyaj, retinol veya AHA/BHA içeren ürünlerden 24 saat kaçının. Yüzünüzü fazla ovmayın veya sıcak suyla yıkamayın. Bu önlemler, tedavinin etkisini maksimize eder.',
      "Ev bakım rutininizi Hydrafacial'ı destekleyecek şekilde düzenleyin. Hafif, pH dengeli bir temizleyici kullanın. Hyaluronik asit içeren nemlendirici, cildin nemini korur. Günlük SPF kullanımı şarttır. Haftada 1-2 kez hafif eksfoliasyon (tedaviden 3-4 gün sonra başlayın) sonuçların kalıcılığını artırır.",
      'İlk seansta zaten belirgin sonuçlar görürsünüz, ancak optimal sonuçlar için düzenli bakım önerilir. Genel bakım için ayda 1 seans idealdir. Yoğun problemler (akne, hiperpigmentasyon) için ilk ayda 2 haftada bir, sonra ayda bir. Özel günler öncesi 1-3 gün önce tek seans bile fark yaratır. Kişisel cilt hedeflerinize göre uzmanlarımız takvim oluşturur.',
      "Hydrafacial'ı diğer hizmetlerimizle kombinleyebilirsiniz. LED terapi, Hydrafacial sonrası hemen uygulanarak etkiyi güçlendirir. Lazer epilasyon ile aynı gün yapılabilir (farklı bölgelerde). Botoks veya dolgu ile aynı gün yapılmaz, 1-2 hafta arayla planlanır. Kapsamlı güzellik paketlerimiz hakkında bilgi alın.",
      'Bazı durumlar dikkat gerektirir. Hamilelik döneminde bazı serumlar kullanılmaz, hamile güvenli protokol uygulanır. Aktif akne lezyonları (kistik akne) varsa tedavi öncesi kontrol gerekir. Rozasea hastalarında özel protokol uygulanır. Son 2 haftada kimyasal peeling veya lazer yaptırdıysanız bekleyin. Konsültasyonda tüm özel durumlarınız değerlendirilir.',
      'Randevu öncesi hazırlık basittir. Makyajlı gelebilirsiniz, işlem öncesi temizlenir. Son 3 gün içinde yoğun eksfoliye edici ürün kullanmayın. Retinol veya AHA/BHA içeren ürünleri 2-3 gün önce bırakın. Güneş yanığı varsa iyileşene kadar bekleyin. İşlem yaklaşık 45-60 dakika sürer, ardından günlük aktivitelerinize dönebilirsiniz.',
      'Mevsimsel olarak Hydrafacial yıl boyunca uygulanabilir. Yazın güneş hasarını onarır ve nem kaybını telafi eder. Kışın kuru ve donuk cildi canlandırır. İlkbahar ve sonbahar, yoğun tedavi programları için idealdir. Her mevsime özel serum kombinasyonları uygulanır.',
      'Özel günleriniz için Hydrafacial planlaması önemlidir. Düğün için 3-6 ay önce aylık bakım başlatın, son seans 1-3 gün önce. Mezuniyet, balo veya önemli etkinlikler için 1-2 ay önce başlayın. Fotoğraf çekimi öncesi 1-3 gün önce tek seans bile cildinizi ışıldatır. Erken randevu alarak en iyi sonuçları garantileyin.',
    ],
  },
  {
    name: '3D Kıl Tekniği (Microblading)',
    description:
      'Doğal kaş kıllarını taklit eden ince çizimlerle kalıcı, gerçekçi ve üç boyutlu kaş görünümü sağlayan profesyonel mikropigmentasyon tekniği.',
    duration: 150,
    image: {
      filename: MEDIA_ASSETS.eyebrowEyelash.filename,
      alt: '3D Kıl Tekniği Microblading',
      mimeType: MEDIA_ASSETS.eyebrowEyelash.mimeType,
    },
    richTextParagraphs: [
      'Kaşlar, yüzün çerçevesi ve ifadenin en belirleyici unsurudur. Doğru şekillendirilmiş kaşlar, yüz hatlarını belirginleştirir, gözleri öne çıkarır ve genel görünümü dramatik şekilde iyileştirir. 3D Kıl Tekniği (Microblading), seyrek, şekilsiz veya tamamen dökülmüş kaşlara doğal görünümlü, kalıcı bir çözüm sunan en gelişmiş kaş mikropigmentasyon yöntemidir.',
      'Microblading, özel bir el aleti (kalem şeklinde mikroblade) kullanılarak cildin üst tabakasına (epidermis) ince kesikler yapılması ve bu kesiklere pigment yerleştirilmesi prensibine dayanır. Her çizgi, gerçek bir kaş kılını taklit edecek şekilde, doğal kaş yönünde ve farklı kalınlıklarda çizilir. Sonuç, boyalı veya dövme görünümünden tamamen farklı, gerçekçi ve üç boyutlu bir kaş görünümüdür.',
      "Belle Güzellik'te 3D Kıl Tekniği uygulaması, yüz analizi ile başlar. Yüz şekliniz (oval, yuvarlak, kare, kalp), kemik yapınız, göz mesafeniz ve alın yüksekliğiniz değerlendirilir. Altın oran kuralları kullanılarak size en uygun kaş formu belirlenir. Bu form, önceden kalemle çizilerek onayınız alınır. Memnun olana kadar düzenleme yapılır.",
      'Uygulama öncesi lokal anestezik krem ile bölge uyuşturulur, işlem bu sayede neredeyse ağrısızdır. Uzman kaş tasarımcımız, önceden belirlenen forma uygun olarak tek tek kıl çizimlerini yapar. Her kıl, farklı açı ve derinliklerde çizilerek doğallık sağlanır. Kaşın başı, ortası ve kuyruk kısımlarında farklı yoğunluklar uygulanarak gerçekçi bir görünüm elde edilir.',
      'Kullandığımız pigmentler, FDA ve CE onaylı, organik ve hipoalerjenik formüllüdür. Cilt tipinize ve doğal kaş renginize en uygun ton seçilir. Pigmentler, zamanla doğal şekilde solarak kaybolur, siyah veya mavi renge dönüşmez. Soğuk tonlarda kahverengi, sıcak tonlarda kahverengi ve sarışınlar için açık tonlar mevcuttur.',
      '3D Kıl Tekniği, kaşları seyrek olan, aşırı aldırılmış kaşları olan, kemoterapi veya alopesi nedeniyle kaş kaybı yaşayan, simetri problemi olan veya her gün kaş makyajı yapmak istemeyen herkes için idealdir. Yaşa bağlı seyrelme yaşayan olgun müşterilerimiz de bu teknikten faydalanabilir.',
      'İlk uygulama yaklaşık 2-2.5 saat sürer. İşlem sonrası kaşlarınız başlangıçta daha koyu ve belirgin görünecektir, bu normaldir. İyileşme sürecinde (7-14 gün) renk %30-50 oranında açılır ve doğal tonuna ulaşır. Kabuklanma ve hafif kaşıntı normaldir. Bu süreci sabırla geçirmek, en iyi sonuçlar için önemlidir.',
      'İlk uygulamadan 4-6 hafta sonra rötuş seansı yapılır. Bu seans, rengin tam oturması ve şeklin mükemmelleştirilmesi için kritiktir. Bazı bölgelerde pigment tutunumu farklı olabilir, rötuşta bu alanlar düzeltilir. Rötuş dahil toplam tedavi süreci yaklaşık 2 ay olarak planlanmalıdır.',
      "3D Kıl Tekniği'nin kalıcılığı cilt tipine ve bakıma bağlı olarak 1-3 yıl arasında değişir. Yağlı ciltlerde daha hızlı solar (1-1.5 yıl), kuru ciltlerde daha uzun süre kalır (2-3 yıl). Güneşe maruz kalma, aktif yaşam tarzı ve cilt bakım ürünleri de kalıcılığı etkiler. Yıllık bakım rötuşları ile kalıcılık uzatılabilir.",
      "Belle Güzellik'te güvenlik ve hijyen en üst önceliğimizdir. Tüm aletler tek kullanımlıktır, sterilizasyon protokollerimiz katıdır. Uzman kaş tasarımcımız, uluslararası sertifikalara sahiptir ve düzenli eğitimlerle kendini günceller. Her uygulama, kişiye özel pigment ve tekniklerle gerçekleştirilir.",
      'Geleneksel kaş dövmesinden farklı olarak, microblading doğal görünüm sunar. Dövme makinesi ile yapılan kalıcı makyaj, düz ve "boyalı" bir görünüm verebilir. Microblading ise tek tek kıl çizimleriyle gerçekçi bir doku oluşturur. Ayrıca zamanla siyaha veya maviye dönüşmez, doğal şekilde solar.',
      "Sonuçlar kişiden kişiye değişir; cilt tipi, yaş, yaşam tarzı ve bakım alışkanlıkları belirleyicidir. Gerçekçi beklentiler önemlidir. İlk seansta %70-80 mükemmellik hedeflenir, rötuşla %90-100'e ulaşılır. Fotoğraflar gösterilecek, süreç detaylı şekilde anlatılacaktır. Konsültasyonda tüm sorularınız yanıtlanacaktır.",
    ],
    features: [
      {
        icon: 'Pencil',
        title: 'Gerçekçi Kıl Çizimi Tekniği',
        description:
          'Özel mikroblade aleti ile tek tek kıl çizimleri yapılır. Her çizgi, gerçek kaş kılı gibi farklı açı, yön ve kalınlıkta oluşturulur. Boyalı veya dövme görünümü yerine doğal, üç boyutlu kaşlar. Sonuç neredeyse gerçek kaşlardan ayırt edilemez.',
      },
      {
        icon: 'Ruler',
        title: 'Altın Oran ile Yüz Analizi',
        description:
          'Yüz şekliniz, kemik yapınız ve göz mesafenize göre matematiksel hesaplama yapılır. Altın oran kuralları ile size en uygun kaş formu belirlenir. İşlem öncesi şekil çizilerek onayınız alınır. Mükemmel simetri hedeflenir.',
      },
      {
        icon: 'Palette',
        title: 'Kişiye Özel Pigment Seçimi',
        description:
          'Cilt tonunuz, saç renginiz ve doğal kaş renginize en uygun pigment tonu seçilir. FDA ve CE onaylı, organik ve hipoalerjenik formüller. Zamanla doğal şekilde solar, renk bozulması yaşanmaz. Soğuk ve sıcak kahverengi seçenekleri.',
      },
      {
        icon: 'Clock',
        title: '1-3 Yıl Kalıcılık',
        description:
          'Cilt tipine ve bakıma bağlı olarak 1-3 yıl kalıcı sonuçlar. Yağlı ciltlerde daha kısa, kuru ciltlerde daha uzun sürer. Yıllık bakım rötuşları ile kalıcılık uzatılabilir. Kalıcı makyajın konforunu yaşayın.',
      },
      {
        icon: 'Shield',
        title: 'Güvenli ve Hijyenik Uygulama',
        description:
          'Tüm aletler tek kullanımlık, sterilizasyon protokolleri katı. Lokal anestezi ile ağrısız işlem. Dermatolojik olarak test edilmiş malzemeler. Uluslararası sertifikalı, deneyimli kaş tasarımcısı.',
      },
      {
        icon: 'RefreshCw',
        title: 'Rötuş ve Bakım Desteği',
        description:
          'İlk uygulamadan 4-6 hafta sonra rötuş seansı dahil. Pigment tutunumu ve şekil düzeltmeleri yapılır. Yıllık bakım rötuşları ile kalıcılık korunur. İşlem sonrası bakım rehberi ve destek sağlanır.',
      },
    ],
    richTextParagraphsAfterFeatures: [
      'İşlem sonrası ilk 7-14 gün iyileşme dönemidir. İlk 24 saat kaşlarınızı ıslatmayın. 7-10 gün boyunca yüzme, sauna, yoğun egzersiz ve terlemeyi önleyin. Güneşe doğrudan maruz kalmayın. Verilen özel bakım kremini talimat doğrultusunda uygulayın. Kabuklanmayı koparmayın, doğal şekilde dökülmesini bekleyin.',
      'İyileşme sürecinde beklentiler: İlk 1-3 gün kaşlar çok koyu ve belirgin görünür. 4-7 gün kabuklanma başlar. 7-14 gün kabuklar dökülür, renk %30-50 açılır. 14-30 gün pigment ciltte oturur, gerçek renk ortaya çıkar. Bu süreç normaldir, panik yapmayın. Rötuş seansında son şekil verilir.',
      "Rötuş seansı (4-6 hafta sonra) kritik öneme sahiptir. İlk seansta pigmentin %60-70'i kalır, rötuşta tamamlanır. Bazı bölgeler daha az pigment tutar, düzeltilir. Şekil ince ayarları yapılabilir. Rötuşu atlamak, sonuçların kalitesini düşürür. Bu seans, toplam ücrete dahildir.",
      'Uzun vadeli bakım için yıllık rötuşlar önerilir. Güneş koruyucu kullanın, UV ışınları pigmenti soldurur. Retinol ve AHA/BHA içeren ürünleri kaş bölgesinde kullanmayın. Düzenli nemlendirme yapın. Bu kurallara uyarak kalıcılığı 3 yıla kadar uzatabilirsiniz.',
      'Microblading, kirpik lifting veya kaş laminasyonu ile kombinlenebilir. Yüz kontürleme veya cilt bakımı ile birlikte kapsamlı paket oluşturulabilir. Dudak çerçevesi ile birlikte "kalıcı makyaj paketi" alabilirsiniz. Kombinasyonlar için uzmanlarımıza danışın.',
      'Bazı durumlar microblading için kontrendikasyondur. Hamilelik ve emzirme döneminde yapılmaz. Aktif cilt hastalıkları (egzama, sedef) varsa bekleyin. Kan sulandırıcı kullananlar doktorlarına danışmalı. Keloid oluşumuna yatkın ciltlerde dikkatli olunmalı. Diyabet hastalarında iyileşme daha yavaş olabilir. Konsültasyonda tüm sağlık geçmişiniz değerlendirilir.',
      'Randevu öncesi hazırlık: 24-48 saat önce alkol ve kafein tüketimini azaltın. Kan sulandırıcı (aspirin, balık yağı) kullanımını 1 hafta önce doktorunuzla görüşerek bırakın. Kaşlarınızı son 2 hafta almayın, doğal şeklini görmemiz gerekir. Botoks yaptırdıysanız 2 hafta bekleyin. İşlem 2-2.5 saat sürer, rahat giyinin.',
      'Gerçekçi beklentiler için: Microblading doğal kaşları taklit eder, yapay kaş oluşturmaz. Tamamen kaşsız bölgeler, çerçeve şeklinde çevrelenerek doldurulur. Aşırı seyrek kaşlar belirgin şekilde dolgunlaşır. Her cilt tipi ve yaşam tarzı farklı sonuç verir. Konsültasyonda sizinle detaylı konuşacak, örnek fotoğraflar gösterecek ve gerçekçi hedefler belirleyeceğiz.',
    ],
  },
  {
    name: 'İpek Kirpik Perması & Lifting',
    description:
      'Doğal kirpiklerinizi kökten uca kıvırarak, 6-8 hafta boyunca kalıcı olarak daha uzun, dolgun ve kıvrık görünüm kazandıran profesyonel kirpik bakım işlemi.',
    duration: 75,
    image: {
      filename: MEDIA_ASSETS.eyebrowEyelash.filename,
      alt: 'İpek Kirpik Perması ve Lifting',
      mimeType: MEDIA_ASSETS.eyebrowEyelash.mimeType,
    },
    richTextParagraphs: [
      'Bakışlar, iletişimin ve çekiciliğin en güçlü araçlarından biridir. Dolgun, kıvrık ve belirgin kirpikler, gözlerinizi öne çıkarır ve yüzünüze doğal bir ışıltı katar. İpek Kirpik Perması ve Lifting, kendi doğal kirpiklerinizi kullanarak kalıcı kıvrım ve hacim sağlayan, maskara veya kirpik kıvırıcıya ihtiyaç duymadan etkileyici bakışlar sunan profesyonel bir işlemdir.',
      'Kirpik lifting, doğal kirpiklerinizin kökten uca kaldırılması ve istenilen kıvrıma sabitlenmesi prensibine dayanır. Özel silikon pedler ve lifting solüsyonları kullanılarak kirpik köklerinin yapısı yumuşatılır, kirpikler istenen pozisyona şekillendirilir ve bu pozisyon kalıcı hale getirilir. Sonuç, kirpiklerin daha uzun, daha kıvrık ve daha dolgun görünmesidir.',
      "Belle Güzellik'te kirpik lifting işlemi, kirpik analizi ile başlar. Doğal kirpik uzunluğunuz, kalınlığınız ve mevcut durumunuz değerlendirilir. Bu analize göre size en uygun kıvrım tipi (J, C, D) ve silikon ped boyu seçilir. Doğal görünüm isteyenler için yumuşak J kıvrım, dramatik bakış isteyenler için belirgin D kıvrım önerilir.",
      'Uygulama tamamen ağrısızdır ve yaklaşık 60-75 dakika sürer. Alt kirpikler özel bantla korunur, üst kirpiklere silikon ped yerleştirilir. Lifting solüsyonu kirpik köklerini yumuşatır (10-12 dk), setting solüsyonu yeni şekli sabitler (10-12 dk), besleyici serum kirpikleri güçlendirir. Kirpik boyama (tinting) opsiyonel olarak eklenebilir.',
      'Kullandığımız ürünler, uluslararası kalite standartlarına uygun, dermatolojik olarak test edilmiş ve kirpik sağlığını koruyan özel formüllerdir. Lifting solüsyonlarımız amonyaksız ve kirpik dostu içeriklerden oluşur. Besleyici serumlarımız keratin, biotin ve peptid içererek kirpikleri güçlendirir. Vegan ve cruelty-free ürün seçeneklerimiz mevcuttur.',
      'İpek Kirpik Perması, kirpikleri düz veya aşağı bakan, her gün kirpik kıvırıcı kullanan, makyajsız bile bakımlı görünmek isteyen, takma kirpik veya extension istemeyenler için idealdir. Doğal görünümü tercih edenler, hassas göz bölgesi olanlar ve günlük bakım rutinini kolaylaştırmak isteyenler bu işlemden çok memnun kalır.',
      'Kirpik boyama (tinting), lifting ile birlikte uygulandığında çok daha etkileyici sonuçlar verir. Boyama işlemi, kirpiklerinizi köklere kadar renklendirir ve daha kalın görünmelerini sağlar. Özellikle açık renkli kirpiklerde belirgin fark yaratır. Siyah, koyu kahverengi veya mavi-siyah ton seçenekleri mevcuttur.',
      'İşlem sonuçları, kirpik yapınıza ve bakımınıza bağlı olarak 6-8 hafta kalıcıdır. Kirpik döngüsü nedeniyle (her 6-8 haftada kirpikler yenilenir) kalıcılık bu süre ile sınırlıdır. Düzenli bakım ile her 6-8 haftada işlemi yenileyebilirsiniz. Her uygulamada kirpikleriniz sağlıklı kalır, zarar görmez.',
      "Takma kirpik veya kirpik extension'dan farklı olarak, lifting doğal kirpiklerinizi kullanır. Extension'da sentetik kirpikler tek tek yapıştırılır ve düzenli dolgu gerektirir. Lifting'de yapıştırma veya ekleme yoktur, sadece kendi kirpikleriniz şekillendirilir. Bakım çok daha kolaydır, suya ve terlemeye dayanıklıdır.",
      "Belle Güzellik'te kirpik lifting uzmanlarımız, uluslararası sertifikalara sahip, deneyimli ve sürekli kendini güncelleyen profesyonellerdir. Her müşteriye kişisel yaklaşım, detaylı analiz ve en uygun teknik uygulanır. Hijyen standartlarımız en üst düzeydedir, tüm aletler tek kullanımlık veya sterilizedir.",
      "Kirpik sağlığı bizim için önceliklidir. Lifting işlemi doğru uygulandığında kirpiklere zarar vermez, aksine besleyici serumlarla güçlendirir. Ancak çok sık uygulama (4 haftadan kısa aralıklarla) veya düşük kaliteli ürünler kirpiklere zarar verebilir. Belle Güzellik'te kalite ve güvenlik asla taviz vermediğimiz değerlerdir.",
      "Sonuçlar, müşterilerimizi makyajsız bile kendine güvenli hissettiriyor. Sabah kalktığınızda hazır kirpiklerle uyanmak, spor yaparken veya yüzerken kirpiklerin dağılmaması, özel günlerde minimal makyajla bile harika görünmek... Tüm bunlar kirpik lifting'in sunduğu avantajlardan sadece birkaçı.",
    ],
    features: [
      {
        icon: 'Eye',
        title: 'Doğal ve Kalıcı Kıvrım',
        description:
          'Kendi doğal kirpikleriniz kökten uca kıvrılır. J, C veya D kıvrım seçenekleriyle istediğiniz görünüm. 6-8 hafta kalıcı sonuçlar. Yapay kirpik takılmaz, sadece mevcut kirpikleriniz şekillendirilir.',
      },
      {
        icon: 'Sparkles',
        title: 'Maskarasız Etkileyici Bakışlar',
        description:
          'Her gün maskara sürmek zorunda kalmadan dolgun ve kıvrık kirpikler. Sabah kalktığınızda hazır görünüm. Su, ter ve neme dayanıklı kalıcılık. Günlük makyaj rutininizi basitleştirin.',
      },
      {
        icon: 'Palette',
        title: 'Kirpik Boyama Seçeneği',
        description:
          'Lifting ile birlikte kirpik boyama, etkiyi katlayarak artırır. Siyah, koyu kahverengi veya mavi-siyah ton seçenekleri. Açık renkli kirpiklerde dramatik fark. Köklere kadar yoğun renk, daha kalın görünüm.',
      },
      {
        icon: 'Shield',
        title: 'Kirpik Sağlığını Koruyan Formül',
        description:
          'Amonyaksız, kirpik dostu lifting solüsyonları. Keratin, biotin ve peptid içeren besleyici serumlar. Dermatolojik olarak test edilmiş ürünler. Vegan ve cruelty-free seçenekler mevcut.',
      },
      {
        icon: 'Clock',
        title: 'Hızlı ve Ağrısız İşlem',
        description:
          '60-75 dakikada tamamlanan konforlu işlem. Tamamen ağrısız, çoğu müşteri rahatlatıcı buluyor. Göz tahrişi veya kızarıklık yok. İşlem sonrası günlük aktivitelere hemen dönülebilir.',
      },
      {
        icon: 'Heart',
        title: "Extension'a Alternatif Doğal Çözüm",
        description:
          "Takma kirpik veya extension'a ihtiyaç duymadan doğal görünüm. Yapıştırma veya ekleme yok, dolgu seansı gerektirmez. Bakımı çok kolay, suya ve terlemeye dayanıklı. Hassas gözler için ideal seçenek.",
      },
    ],
    richTextParagraphsAfterFeatures: [
      "İşlem sonrası ilk 24-48 saat kritiktir. Kirpiklerinizi ıslatmayın, buhar ve yoğun neme maruz bırakmayın. Gözlerinizi ovmayın veya kirpiklere dokunmayın. Yüzüstü uyumayın. Bu süre içinde makyaj yapmayın. Bu kurallara uyarak lifting'in tam oturmasını sağlarsınız.",
      "Günlük bakımda kirpiklerinizi nazik şekilde temizleyin. Yağ bazlı makyaj temizleyicilerden kaçının, yağ lifting'in ömrünü kısaltır. Su bazlı ürünler tercih edin. Kirpik serumu kullanmak istiyorsanız lifting'den 48 saat sonra başlayabilirsiniz. Düzenli fırçalama (kirpik tarağı ile) kirpiklerin düzgün durmasını sağlar.",
      'Sonuçlar ortalama 6-8 hafta kalıcıdır. Bu süre, kirpik döngüsüne (kirpiklerin doğal olarak dökülüp yenilenmesine) bağlıdır. 4. haftadan itibaren yeni çıkan kirpikler kıvrımsız olacağından, görünüm hafifleyebilir. Tam etki için 6-8 haftada bir yenileme önerilir.',
      'Kirpik lifting, kirpik boyama ile kombinlendiğinde en iyi sonucu verir. Aynı seansta uygulanabilir. Kaş laminasyonu ile birlikte "göz paketi" oluşturabilirsiniz. Hydrafacial veya cilt bakımı ile aynı gün yaptırılabilir (farklı bölgelerde). Kapsamlı güzellik paketlerimizi inceleyin.',
      'Bazı durumlar kirpik lifting için kontrendikasyondur. Aktif göz enfeksiyonu (konjonktivit, arpacık) varsa iyileşene kadar bekleyin. Göz ameliyatı sonrası 3 ay bekleyin. Hamilelik ve emzirme döneminde uygulama önerilmez. Aşırı hassas veya alerjik gözlerde önce yama testi yapılır. Kontakt lens kullananlar, işlem günü lens takmamalıdır.',
      'Randevu öncesi hazırlık basittir. Kirpikleriniz temiz ve makyajsız olmalı. Son 24 saat kirpik serumu kullanmayın. Kontakt lens kullanıyorsanız, işlem günü gözlük getirin. Kafein tüketimini azaltın, göz titremesini önlemek için. İşlem 60-75 dakika sürer, rahat bir pozisyonda uzanırsınız.',
      'Gerçekçi beklentiler önemlidir. Kirpik lifting, mevcut kirpiklerinizi şekillendirir, yenilerini eklemez. Çok kısa veya seyrek kirpiklerde etki sınırlı olabilir. Bu durumda kirpik serumu kullanımı veya extension önerilebilir. Konsültasyonda kirpikleriniz değerlendirilir ve size en uygun çözüm önerilir.',
      'Özel günleriniz için planlama yapın. Düğün, mezuniyet veya önemli etkinlikler için 1-2 hafta önce yaptırın (kirpiklerin tam oturması için). İlk kez yaptırıyorsanız, 2-3 hafta önce deneme yapın. Fotoğraf çekimlerinde lifting + boyama kombinasyonu harika sonuçlar verir.',
    ],
  },
  {
    name: 'Dudak Çerçevesi & Kontur',
    description:
      'Dudaklarınıza net bir kenar hattı, dolgunluk görünümü ve istenilen renk tonu kazandıran, 1-3 yıl kalıcı profesyonel dudak mikropigmentasyon tekniği.',
    duration: 120,
    image: {
      filename: MEDIA_ASSETS.facialMask.filename,
      alt: 'Dudak Çerçevesi ve Kontur',
      mimeType: MEDIA_ASSETS.facialMask.mimeType,
    },
    richTextParagraphs: [
      'Dudaklar, yüzün en dikkat çekici ve çekici unsurlarından biridir. Belirgin, şekilli ve renkli dudaklar, gülümsemenizi ön plana çıkarır ve yüzünüze canlılık katar. Dudak Çerçevesi ve Kontur, kalıcı makyaj tekniklerinin en popüler uygulamalarından biridir ve dudaklarınıza doğal veya istediğiniz tonlarda kalıcı renk ve şekil kazandırır.',
      'Dudak pigmentasyonu, özel mikropigmentasyon cihazı kullanılarak dudak derisine pigment yerleştirilmesi prensibine dayanır. Uygulama tiplerine göre kontur (sadece dudak hattı), kontür + iç dolgu (hat + hafif renk) veya tam dolgu (tüm dudak yüzeyi) seçenekleri mevcuttur. En doğal sonuçlar için kontür + hafif iç dolgu kombinasyonu tercih edilir.',
      "Belle Güzellik'te dudak çerçevesi işlemi, yüz analizi ve renk konsültasyonu ile başlar. Dudak şekliniz, yüz oranlarınız ve cilt tonunuz değerlendirilir. Size en uygun dudak formu belirlenir ve kalemle çizilerek onayınız alınır. Renk seçiminde doğal dudak renginiz, cilt tonunuz ve kişisel tercihleriniz dikkate alınır.",
      'Uygulama öncesi lokal anestezik krem ile dudaklar uyuşturulur, bu sayede işlem neredeyse ağrısızdır. Uzman pigmentasyon sanatçımız, belirlenen forma uygun olarak pigmentasyonu uygular. Önce kontür hattı çizilir, ardından istenilen tekniğe göre iç dolgu yapılır. İşlem yaklaşık 2-2.5 saat sürer.',
      'Kullandığımız pigmentler, FDA ve CE onaylı, organik bazlı ve hipoalerjenik formüllerdir. Dudak pigmentleri, zamanla doğal şekilde solarak kaybolur, istenmeyen renk dönüşümü yaşanmaz. Pembe, nude, gül, mercan ve kırmızımsı tonlarda geniş renk yelpazesi mevcuttur. Cilt tonunuza en uygun rengi birlikte seçeriz.',
      'Dudak çerçevesi, dudak kenarları belirsiz veya asimetrik olan, dudakları ince görünen ve dolgunluk isteyen, dudak rengini canlı tutmak isteyen, her gün ruj sürmek istemeyen veya rujun akmasından ve bulaşmasından rahatsız olan herkes için idealdir. Yaşlanma ile dudak rengini ve şeklini kaybeden olgun müşterilerimiz de bu işlemden büyük fayda görür.',
      'İşlem sonrası dudaklar başlangıçta %30-50 daha koyu ve şişkin görünür, bu tamamen normaldir. 7-10 gün içinde şişlik iner, kabuklanma olur ve dökülür. 3-4 hafta içinde gerçek renk ortaya çıkar. İyileşme sürecinde renk değişimleri normaldir, endişelenmeyin.',
      'İlk uygulamadan 4-8 hafta sonra rötuş seansı yapılır. Rötuş, rengin tam oturması ve olası düzeltmeler için kritiktir. Bazı bölgelerde pigment tutunumu farklı olabilir, rötuşta bu düzeltilir. Rötuş dahil toplam tedavi süreci yaklaşık 2-3 ay olarak planlanmalıdır.',
      'Dudak pigmentasyonunun kalıcılığı 1-3 yıl arasında değişir. Cilt tipi, yaşam tarzı, güneşe maruz kalma ve bakım alışkanlıkları kalıcılığı etkiler. Açık renkler daha hızlı solar, koyu renkler daha uzun sürer. Yıllık bakım rötuşları ile kalıcılık uzatılabilir ve renk tazelenebilir.',
      'Dudak pigmentasyonu ve dudak dolgusu (filler) farklı işlemlerdir. Pigmentasyon sadece renk ve şekil verir, hacim eklemez. Dolgu ise dudağa hacim katar. Her iki işlem de birlikte uygulanabilir, ancak dolgu önce, pigmentasyon dolgu tam oturduktan sonra (2-4 hafta) yapılmalıdır.',
      "Belle Güzellik'te güvenlik ve hijyen en üst önceliğimizdir. Tüm iğne uçları tek kullanımlıktır. Sterilizasyon protokollerimiz katıdır. Uzman pigmentasyon sanatçımız, uluslararası sertifikalara sahiptir. Her uygulama, kişiye özel pigment ve tekniklerle gerçekleştirilir.",
      'Sonuçlar, her gün ruj sürmeden bile güzel dudaklara sahip olmanızı sağlar. Yüzerken, spor yaparken, öpüşürken ruj bulaşma endişesi olmaz. Sabah uyandığınızda dudaklarınız hazır. Özel günlerde sadece parlatıcı ekleyerek mükemmel görünüm elde edersiniz. Bu konforu bir kez yaşadığınızda vazgeçemeyeceksiniz.',
    ],
    features: [
      {
        icon: 'Heart',
        title: 'Doğal ve Şekilli Dudak Hattı',
        description:
          'Net ve belirgin dudak çerçevesi ile şekil verilir. Asimetri düzeltilir, ince dudaklar daha dolgun gösterilir. Yüz oranlarınıza uygun form belirlenir. Sonuç doğal ve zarif, abartılı görünüm yok.',
      },
      {
        icon: 'Palette',
        title: 'Kişiye Özel Renk Seçimi',
        description:
          'Cilt tonunuz ve tercihlerinize göre geniş renk yelpazesi. Pembe, nude, gül, mercan, kırmızımsı tonlar mevcut. FDA onaylı, organik bazlı pigmentler. Zamanla doğal şekilde solar, renk bozulması olmaz.',
      },
      {
        icon: 'Layers',
        title: 'Çeşitli Uygulama Teknikleri',
        description:
          'Sadece kontür, kontür + hafif iç dolgu veya tam dolgu seçenekleri. İstediğiniz yoğunlukta renk. En doğal sonuç için kontür + hafif dolgu önerilir. Tercihlerinize göre kişiselleştirilir.',
      },
      {
        icon: 'Clock',
        title: '1-3 Yıl Kalıcı Sonuçlar',
        description:
          'Cilt tipine ve bakıma bağlı olarak 1-3 yıl kalıcılık. Yıllık rötuşlarla tazelenebilir. Kalıcı makyajın konforunu yaşayın. Her gün ruj sürmekten kurtulun.',
      },
      {
        icon: 'Shield',
        title: 'Güvenli ve Ağrısız İşlem',
        description:
          'Lokal anestezi ile neredeyse ağrısız uygulama. Tek kullanımlık, steril malzemeler. Dermatolojik olarak test edilmiş pigmentler. Uluslararası sertifikalı uzman tarafından uygulama.',
      },
      {
        icon: 'Smile',
        title: 'Günlük Yaşamda Kolaylık',
        description:
          'Yüzerken, spor yaparken, öpüşürken bulaşma yok. Sabah hazır dudaklarla uyanın. Ruj taşıma ve tazeleme derdi yok. Sadece parlatıcı ile mükemmel görünüm.',
      },
    ],
    richTextParagraphsAfterFeatures: [
      'İşlem sonrası ilk 7-10 gün iyileşme dönemidir. İlk 24 saat dudaklarınızı ıslatmayın. 7-10 gün boyunca çok sıcak veya baharatlı yiyeceklerden kaçının. Dudaklarınızı yalamayın veya ısırmayın. Verilen özel bakım merhemini düzenli uygulayın. Kabuklanmayı kopartmayın, doğal dökülmesini bekleyin.',
      'İyileşme sürecinde görsel değişimler normaldir. İlk 1-3 gün şişlik ve çok koyu renk. 4-7 gün kabuklanma başlar. 7-14 gün kabuklar dökülür, renk çok açık görünür. 3-4 hafta pigment ciltte oturur, gerçek renk ortaya çıkar. Bu süreç herkes için farklıdır, sabırlı olun.',
      "Rötuş seansı (4-8 hafta sonra) kritik öneme sahiptir. İlk seansta pigmentin %50-70'i kalır, rötuşta tamamlanır. Şekil ince ayarları ve renk yoğunluğu düzeltmeleri yapılır. Rötuşu atlamak sonuçların kalitesini düşürür. Bu seans toplam ücrete dahildir.",
      'Uzun vadeli bakım için yıllık tazeleme rötuşları önerilir. SPF içeren dudak balsamı kullanın, güneş pigmenti soldurur. Dudak peelingi yaparken nazik olun. AHA/BHA içeren dudak ürünlerinden kaçının. Bu kurallara uyarak kalıcılığı maksimize edin.',
      'Dudak pigmentasyonu, 3D Kıl Tekniği (kaş) ile birlikte "kalıcı makyaj paketi" olarak kombinlenebilir. Yüz bakımı veya Hydrafacial ile aynı gün yapılabilir (farklı bölgelerde). Dudak dolgusu ile kombinasyon için önce dolgu, 2-4 hafta sonra pigmentasyon önerilir.',
      'Bazı durumlar dudak pigmentasyonu için kontrendikasyondur. Aktif herpes enfeksiyonu varsa iyileşene kadar bekleyin (herpes geçmişi olanlara profilaktik antiviral önerilir). Hamilelik ve emzirme döneminde yapılmaz. Kan sulandırıcı kullananlar doktorlarına danışmalı. Dudak dolgusu yaptırdıysanız 2-4 hafta bekleyin.',
      'Randevu öncesi hazırlık: 1 hafta önce dudak peelingi yapmayı bırakın. 24-48 saat önce alkol tüketimini azaltın. Herpes geçmişiniz varsa, işlemden 3 gün önce antiviral ilaç başlatın (doktorunuza danışın). Dudaklarınız nemlendirici ile bakımlı olmalı, kurumuş olmamalı. İşlem 2-2.5 saat sürer.',
      'Gerçekçi beklentiler önemlidir. Dudak pigmentasyonu kalıcı ruj etkisi verir, ancak dolgunluk eklemez. Çok ince dudaklar kontür ile daha belirgin görünür, ancak hacim için dolgu gerekir. Her cilt farklı pigment tutar, sonuçlar kişiye göre değişir. Konsültasyonda detaylı bilgi alacak, örnek fotoğraflar göreceksiniz.',
    ],
  },
  {
    name: 'Kalıcı Oje & Nail Art',
    description:
      'UV/LED jel teknolojisi ile 2-3 hafta çizilmeden ve solmadan kalıcı, parlak tırnaklar ve sınırsız sanatsal tasarım seçenekleri.',
    duration: 75,
    image: {
      filename: MEDIA_ASSETS.nailArt.filename,
      alt: 'Kalıcı Oje ve Nail Art',
      mimeType: MEDIA_ASSETS.nailArt.mimeType,
    },
    richTextParagraphs: [
      'Tırnaklar, el güzelliğinin ve kişisel bakımın en görünür göstergesidir. Bakımlı, şekilli ve renkli tırnaklar, özgüveninizi artırır ve stilinizi tamamlar. Kalıcı Oje ve Nail Art hizmetimiz, UV/LED jel teknolojisi ile 2-3 hafta boyunca ilk günkü parlaklığını koruyan, çizilmeyen ve solmayan mükemmel tırnaklar sunar.',
      'Kalıcı oje (jel oje), geleneksel ojeden farklı olarak UV veya LED ışık altında sertleşen özel bir formüle sahiptir. Bu sertleşme (kürleme) süreci, ojenin tırnağa güçlü bir şekilde yapışmasını ve dayanıklı bir tabaka oluşturmasını sağlar. Sonuç, 2-3 hafta boyunca çizilmeyen, soyulmayan ve parlaklığını kaybetmeyen mükemmel tırnaklardır.',
      "Belle Güzellik'te kalıcı oje uygulaması, tırnak hazırlığı ile başlar. Tırnaklarınız şekillendirilir, tırnak etleri (kütikül) nazikçe itilir, tırnak yüzeyi hafifçe matlaştırılarak ojenin tutunması sağlanır. Base coat (baz kat), renk katları (2-3 kat) ve top coat (son kat) sırasıyla uygulanır, her kat UV/LED lamba altında kürlenir.",
      'Nail Art (tırnak sanatı), sıradan bir manikürü sanat eserine dönüştürür. French manikür, ombre (geçişli renkler), glitter (simli), taş ve kristal uygulamaları, çiçek ve geometrik desenler, 3D kabartma tasarımlar, folyo ve transfer desenleri... Hayal gücünüzün sınırı yoktur. Uzman nail artistlerimiz her tasarımı özenle gerçekleştirir.',
      'Kullandığımız ürünler, dünya çapında kabul görmüş profesyonel markalardan (OPI, CND Shellac, Gelish, Kiara Sky) seçilmiştir. Tüm jeller 10-free veya 7-free formüldedir, yani zararlı kimyasallar içermez. Pigment yoğunluğu yüksek, renk çeşitliliği geniş (500+ renk seçeneği) ve parlaklık kalıcıdır.',
      'Kalıcı oje, evde düzenli oje süremeyenler, hızlı kurumasını bekleyemeyenler, sık sık oje dökülmesinden rahatsız olanlar, ellerini yoğun kullananlar (mutfak, temizlik, ofis işleri), özel gün hazırlığı yapanlar ve her zaman bakımlı görünmek isteyenler için ideal bir çözümdür.',
      'Doğal tırnak sağlığı bizim için önceliklidir. Kalıcı oje doğru uygulandığında ve çıkarıldığında tırnaklara zarar vermez. Asetonsuz, nazik çıkarma tekniklerimiz tırnak yüzeyini korur. Tırnak güçlendirici base coat kullanarak zayıf tırnakları destekleriz. Düzenli bakım ve nemlendirme ile tırnak sağlığınız korunur.',
      'UV/LED lambaların güvenliği konusunda endişelenmeyin. Kullandığımız LED lambalar düşük UV yayılımına sahiptir ve kısa kürleme süreleri (30-60 saniye) ile cilde minimal maruziyettir. Yine de ekstra koruma isteyenler için güneş koruyucu veya UV koruyucu eldiven seçeneklerimiz mevcuttur.',
      "Kalıcı oje çıkarma işlemi, profesyonel hands-on tarafından yapılmalıdır. Evde zorla soyma veya kazıma, tırnak yüzeyine ciddi hasar verir. Belle Güzellik'te özel solüsyonlarla nazik çıkarma tekniği uygulanır. Çıkarma işlemi yaklaşık 15-20 dakika sürer ve tırnaklarınız sağlıklı kalır.",
      'Mevsimsel trendleri ve renk paletlerini yakından takip ediyoruz. İlkbahar pasteller, yaz canlı renkler, sonbahar toprak tonları, kış koyu ve metalik tonlar... Her mevsim için önerilen renkler ve tasarımlar sunuyoruz. Özel koleksiyonlarımız (düğün, bayram, yılbaşı) sezonluk olarak güncellenir.',
      "Belle Güzellik'te nail artistlerimiz, hem teknik hem de sanatsal açıdan uzmanlaşmıştır. Düzenli eğitimlerle yeni teknikler ve trendler öğrenirler. Her müşteriye kişisel yaklaşım, stil danışmanlığı ve özel tasarımlar sunarlar. Hijyen standartlarımız en üst düzeydedir, tüm aletler sterilize edilir.",
      'Kalıcı oje ve nail art, sadece güzel tırnaklar değil, kendinize ayırdığınız özel bir zaman ve kendine bakım ritüelidir. Rahat koltuklarımızda, keyifli bir müzik eşliğinde, uzman ellerinde tırnaklarınızın sanata dönüşmesini izlemek... Bu deneyimi yaşadığınızda düzenli müşterimiz olacağınızdan eminiz.',
    ],
    features: [
      {
        icon: 'Clock',
        title: '2-3 Hafta Kalıcı Parlaklık',
        description:
          'UV/LED jel teknolojisi ile 2-3 hafta boyunca ilk günkü parlaklığını koruyan tırnaklar. Çizilme, soyulma veya solma yok. Günlük aktivitelere, ev işlerine ve suya dayanıklı. Her zaman bakımlı görünüm.',
      },
      {
        icon: 'Palette',
        title: '500+ Renk ve Tasarım Seçeneği',
        description:
          'Pastellerden canlı renklere, nude tonlardan metaliklere geniş renk yelpazesi. French, ombre, glitter, taş, 3D tasarım seçenekleri. Sezonluk koleksiyonlar ve özel gün tasarımları. Tarzınıza uygun mükemmel seçenek.',
      },
      {
        icon: 'Shield',
        title: 'Tırnak Sağlığını Koruyan Formül',
        description:
          '10-free ve 7-free formüller, zararlı kimyasal yok. Tırnak güçlendirici base coat seçeneği. Nazik çıkarma tekniği ile tırnak yüzeyini koruma. OPI, CND Shellac, Gelish gibi güvenilir markalar.',
      },
      {
        icon: 'Paintbrush',
        title: 'Uzman Nail Art Sanatçıları',
        description:
          'Teknik ve sanatsal açıdan uzmanlaşmış nail artistler. Elle çizim, airbrush, stamping ve 3D tasarım uzmanlığı. Kişiye özel tasarımlar ve stil danışmanlığı. Her detay titizlikle işlenir.',
      },
      {
        icon: 'Zap',
        title: 'Hızlı ve Güvenli LED Kürleme',
        description:
          'Modern LED lambalar ile 30-60 saniyede kürleme. Düşük UV yayılımı, güvenli teknoloji. Uzun bekleme süreleri yok, kurumadan çizilme riski yok. İşlem sonrası hemen günlük aktivitelere dönüş.',
      },
      {
        icon: 'Sparkles',
        title: 'Premium Bakım Deneyimi',
        description:
          'Konforlu koltuklar, keyifli atmosfer, kişisel ilgi. Tırnak şekillendirme, kütikül bakımı dahil. Steril aletler, hijyenik ortam. Kendinize ayırdığınız özel bir bakım ritüeli.',
      },
    ],
    richTextParagraphsAfterFeatures: [
      'İşlem sonrası ilk birkaç saat tırnaklarınıza dikkat edin. Jel oje anında kurur ancak tam sertleşme 24 saat içinde tamamlanır. İlk gün çok sıcak su, buhar ve kimyasal ürünlerden kaçının. Tırnaklarınızı araç olarak kullanmaktan (kutu açma, etiket kazıma) kaçının. Bu önlemlerle ojenin ömrü uzar.',
      'Günlük bakımda ellerinizi ve tırnak etlerinizi düzenli nemlendirin. Kütikül yağı kullanmak hem estetik hem de sağlık açısından faydalıdır. Bulaşık yıkarken eldiven kullanın, deterjan ojenin parlaklığını azaltabilir. Tırnaklarınız uzadıkça kökten çıkan boşluk normaldir, bu kalıcı ojenin süresi dolduğunun işaretidir.',
      'Kalıcı oje genellikle 2-3 hafta mükemmel kalır. 2. haftadan sonra doğal tırnak büyümesi nedeniyle kökte boşluk oluşur. Bu estetik açıdan rahatsız edici olduğunda yenileme zamanı gelmiştir. Tırnak yapınıza göre bazıları 3-4 hafta dayanabilir, bazıları 2 haftada yenileme isteyebilir.',
      "Kalıcı ojeyi evde çıkarmaya çalışmayın. Zorla soyma veya kazıma, tırnak yüzeyindeki üst tabakaları da söker ve tırnaklara ciddi hasar verir. Belle Güzellik'te profesyonel çıkarma işlemi sadece 15-20 dakika sürer ve tırnaklarınız sağlıklı kalır. Çıkarma + yeni uygulama paketlerimiz mevcuttur.",
      'Manikür ve pedikür hizmetlerimizi kalıcı oje ile kombinleyebilirsiniz. El bakımı + kalıcı oje veya ayak bakımı + kalıcı oje paketleri popüler tercihlerimiz arasında. Kaş ve kirpik hizmetlerimizle birlikte "tam bakım günü" paketi oluşturabilirsiniz.',
      'Bazı durumlar kalıcı oje için dikkat gerektirir. Tırnak mantarı veya enfeksiyonu varsa önce tedavi edilmeli. Aşırı ince ve kırılgan tırnaklar için güçlendirici tedavi önerilir. Hamilelikte kullanılan ürünler güvenli formülasyondadır ancak koku hassasiyeti olabilir. Alerjik reaksiyon geçmişi olanlara yama testi yapılır.',
      'Randevu öncesi tırnaklarınız temiz ve ojsiz olmalı. Kendi ojenizi çıkarıp gelmenize gerek yok, biz çıkarırız. El kremleri veya yağ kullanmayın, ojenin tutunmasını zorlaştırır. Uzunluk ve şekil tercihinizi düşünün. İşlem 60-90 dakika sürer (tasarıma göre değişir).',
      'Özel günleriniz için planlama yapın. Düğün, nişan, mezuniyet gibi etkinlikler için 2-3 gün önce yaptırın (olası küçük düzeltmeler için zaman kalır). Nail art tasarımınızı önceden belirleyin, karmaşık tasarımlar için ek süre gerekebilir. Fotoğraf çekimlerinde tırnaklarınızın görünümü önemli, bize ilham fotoğrafları getirin.',
    ],
  },
]

export async function seedServices(payload: Payload): Promise<void> {
  payload.logger.info('Seeding services...')

  for (const serviceData of SEED_SERVICES) {
    const { docs: existingServices } = await payload.find({
      collection: 'services',
      where: {
        name: {
          equals: serviceData.name,
        },
      },
      limit: 1,
    })

    if (existingServices.length > 0) {
      payload.logger.info(`Service already exists: ${serviceData.name}`)
      continue
    }

    const coverImageId = await getOrCreateMedia(payload, serviceData.image)
    const serviceSlug = turkishToSlug(serviceData.name)

    const service = await payload.create({
      collection: 'services',
      draft: false,
      data: {
        name: serviceData.name,
        slug: serviceSlug,
        description: serviceData.description,
        duration: serviceData.duration,
        coverImage: coverImageId ?? undefined,
      },
    })

    payload.logger.info(`Created service: ${serviceData.name}`)

    const pageSlug = `hizmetler/${serviceSlug}`
    const { docs: existingPages } = await payload.find({
      collection: 'pages',
      where: {
        slug: { equals: pageSlug },
      },
      limit: 1,
    })

    if (existingPages.length > 0) {
      await payload.update({
        collection: 'pages',
        id: existingPages[0].id,
        data: {
          layout: [
            {
              blockType: 'service-header',
              service: service.id,
            },
            {
              blockType: 'rich-text',
              content: createRichTextContent(serviceData.richTextParagraphs),
            },
            {
              blockType: 'features',
              features: serviceData.features,
            },
            {
              blockType: 'rich-text',
              content: createRichTextContent(serviceData.richTextParagraphsAfterFeatures),
            },
          ],
        },
      })
      payload.logger.info(`Updated service page with content: ${serviceData.name}`)
    } else {
      await payload.create({
        collection: 'pages',
        data: {
          title: serviceData.name,
          slug: pageSlug,
          layout: [
            {
              blockType: 'service-header',
              service: service.id,
            },
            {
              blockType: 'rich-text',
              content: createRichTextContent(serviceData.richTextParagraphs),
            },
            {
              blockType: 'features',
              features: serviceData.features,
            },
            {
              blockType: 'rich-text',
              content: createRichTextContent(serviceData.richTextParagraphsAfterFeatures),
            },
          ],
        },
      })
      payload.logger.info(`Created service page: ${serviceData.name}`)
    }
  }

  payload.logger.info('Services seeded successfully')
}
