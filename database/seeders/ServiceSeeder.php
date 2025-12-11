<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        $services = [
            [
                'name' => 'Profesyonel Cilt Bakımı',
                'description' => 'Cildinizin ihtiyaçlarına özel olarak tasarlanmış, derinlemesine temizlik ve nemlendirme içeren kapsamlı yüz bakımı.',
                'content' => $this->getCiltBakimiContent(),
                'duration' => 75,
                'image_file' => 'woman-receiving-facial-mask-applied-by-beautician.jpg',
            ],
            [
                'name' => 'Kalıcı Oje & Nail Art',
                'description' => 'Profesyonel kalıcı oje uygulaması ve özel tasarım nail art ile tırnaklarınızı sanata dönüştürün.',
                'content' => $this->getKaliciOjeContent(),
                'duration' => 60,
                'image_file' => 'nail-art.jpg',
            ],
            [
                'name' => 'Kaş & Kirpik Tasarımı',
                'description' => 'Yüz hatlarınıza uygun profesyonel kaş şekillendirme ve kirpik lifting ile bakışlarınızı canlandırın.',
                'content' => $this->getKasKirpikContent(),
                'duration' => 90,
                'image_file' => 'woman-with-eyebrow-and-eyelash-design-applied.jpg',
            ],
        ];

        foreach ($services as $serviceData) {
            $imageFile = $serviceData['image_file'];
            unset($serviceData['image_file']);

            $service = Service::updateOrCreate(
                ['name' => $serviceData['name']],
                $serviceData
            );

            // Görsel ekleme
            $imagePath = public_path('media/services/'.$imageFile);

            if (File::exists($imagePath)) {
                // Eğer daha önce görsel eklenmemişse veya farklı bir görsel varsa güncelle
                if (! $service->getFirstMedia('image')) {
                    $service->addMedia($imagePath)
                        ->preservingOriginal()
                        ->toMediaCollection('image');
                }
            }
        }
    }

    private function getCiltBakimiContent(): string
    {
        return <<<'HTML'
<div class="space-y-8">
    <div class="prose prose-lg max-w-none text-gray-600">
        <p class="lead text-xl text-gray-700 font-light">
            Belle Güzellik Merkezi'nde sunduğumuz Profesyonel Cilt Bakımı, cildinizin benzersiz ihtiyaçlarını karşılamak üzere özenle tasarlanmış kapsamlı bir bakım programıdır. Uzman ekibimiz, en son cilt bakım teknolojilerini ve premium ürünleri kullanarak cildinize hak ettiği ışıltıyı geri kazandırır.
        </p>

        <div class="my-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div class="bg-pink-50/50 p-4 md:p-6 rounded-2xl border border-pink-100 h-full" data-variant="pink">
                <h3 class="text-xl font-serif text-pink-900 mb-4 flex items-center">
                    <span class="w-8 h-8 rounded-full bg-pink-200 flex items-center justify-center mr-3 text-sm">01</span>
                    Cilt Analizi
                </h3>
                <p class="text-sm">Özel cihazlarla cildinizin nem, yağ ve elastikiyet seviyelerini ölçerek size özel bir yol haritası çıkarıyoruz.</p>
            </div>

            <div class="bg-pink-50/50 p-4 md:p-6 rounded-2xl border border-pink-100 h-full" data-variant="pink">
                <h3 class="text-xl font-serif text-pink-900 mb-4 flex items-center">
                    <span class="w-8 h-8 rounded-full bg-pink-200 flex items-center justify-center mr-3 text-sm">02</span>
                    Derin Temizlik
                </h3>
                <p class="text-sm">Gözeneklerinizi tıkayan kirlilik, makyaj kalıntıları ve ölü derilerden cildinizi nazikçe arındırıyoruz.</p>
            </div>

            <div class="bg-pink-50/50 p-4 md:p-6 rounded-2xl border border-pink-100 h-full" data-variant="pink">
                <h3 class="text-xl font-serif text-pink-900 mb-4 flex items-center">
                    <span class="w-8 h-8 rounded-full bg-pink-200 flex items-center justify-center mr-3 text-sm">03</span>
                    Besleyici Bakım
                </h3>
                <p class="text-sm">Cilt tipinize özel seçilmiş serumlar ve maskelerle cildinizin ihtiyaç duyduğu vitamin ve mineralleri sağlıyoruz.</p>
            </div>

            <div class="bg-pink-50/50 p-4 md:p-6 rounded-2xl border border-pink-100 h-full" data-variant="pink">
                <h3 class="text-xl font-serif text-pink-900 mb-4 flex items-center">
                    <span class="w-8 h-8 rounded-full bg-pink-200 flex items-center justify-center mr-3 text-sm">04</span>
                    Koruma
                </h3>
                <p class="text-sm">Nemlendirici ve SPF koruması ile bakımın etkisini mühürlüyor, cildinizi dış etkenlere karşı korumaya alıyoruz.</p>
            </div>
        </div>

        <h3 class="text-2xl font-serif text-gray-900 mb-4">Kimler İçin Uygundur?</h3>
        <ul class="list-none space-y-2 pl-0">
            <li class="flex items-center text-gray-600">
                <svg class="w-5 h-5 text-pink-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                Yorgun ve cansız görünen cilde sahip olanlar
            </li>
            <li class="flex items-center text-gray-600">
                <svg class="w-5 h-5 text-pink-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                Gözenek genişliği ve siyah nokta sorunu yaşayanlar
            </li>
            <li class="flex items-center text-gray-600">
                <svg class="w-5 h-5 text-pink-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                Daha aydınlık ve pürüzsüz bir cilt isteyenler
            </li>
            <li class="flex items-center text-gray-600">
                <svg class="w-5 h-5 text-pink-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                Düzenli cilt bakım rutini oluşturmak isteyenler
            </li>
        </ul>

        <div class="mt-8 p-6 bg-gray-50 rounded-xl border-l-4 border-pink-400 italic text-gray-600">
            "Cildiniz, yaşam boyu taşıyacağınız en değerli giysinizdir. Ona iyi bakın."
        </div>
    </div>
</div>
HTML;
    }

    private function getKaliciOjeContent(): string
    {
        return <<<'HTML'
<div class="space-y-8">
    <div class="prose prose-lg max-w-none text-gray-600">
        <p class="lead text-xl text-gray-700 font-light">
            Kalıcı oje uygulamalarımız, tırnaklarınızın hem sağlığını koruyan hem de haftalarca kusursuz görünmesini sağlayan profesyonel bir deneyim sunar. Geniş renk yelpazemiz ve özel nail art tasarımlarımızla tarzınızı yansıtın.
        </p>

        <div class="my-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-6">
            <div class="text-center p-4 md:p-6 bg-white shadow-sm rounded-xl border border-gray-100 h-full" data-variant="white">
                <div class="w-12 h-12 mx-auto bg-pink-100 rounded-full flex items-center justify-center text-pink-600 mb-4">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <h4 class="font-bold text-gray-900 mb-2">Uzun Ömürlü</h4>
                <p class="text-sm text-gray-500">2-3 hafta boyunca ilk günkü parlaklığını koruyan, çizilmeyen mükemmel görünüm.</p>
            </div>

            <div class="text-center p-4 md:p-6 bg-white shadow-sm rounded-xl border border-gray-100 h-full" data-variant="white">
                <div class="w-12 h-12 mx-auto bg-pink-100 rounded-full flex items-center justify-center text-pink-600 mb-4">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                </div>
                <h4 class="font-bold text-gray-900 mb-2">Tırnak Dostu</h4>
                <p class="text-sm text-gray-500">Tırnaklarınıza zarar vermeyen, aksine kırılmalara karşı koruma sağlayan özel formül.</p>
            </div>

            <div class="text-center p-4 md:p-6 bg-white shadow-sm rounded-xl border border-gray-100 h-full" data-variant="white">
                <div class="w-12 h-12 mx-auto bg-pink-100 rounded-full flex items-center justify-center text-pink-600 mb-4">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path></svg>
                </div>
                <h4 class="font-bold text-gray-900 mb-2">Sınırsız Sanat</h4>
                <p class="text-sm text-gray-500">French, ombre, geometrik desenler veya taş süslemelerle tarzınızı yansıtın.</p>
            </div>
        </div>

        <div class="bg-gray-50 rounded-2xl p-6 md:p-8 h-full my-8">
            <h3 class="text-2xl font-serif text-gray-900 mb-6 text-center">Nail Art Seçeneklerimiz</h3>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div class="flex items-center space-x-2">
                    <span class="w-2 h-2 bg-pink-400 rounded-full"></span>
                    <span>French Manikür</span>
                </div>
                <div class="flex items-center space-x-2">
                    <span class="w-2 h-2 bg-pink-400 rounded-full"></span>
                    <span>Baby Boomer</span>
                </div>
                <div class="flex items-center space-x-2">
                    <span class="w-2 h-2 bg-pink-400 rounded-full"></span>
                    <span>Krom Efektler</span>
                </div>
                <div class="flex items-center space-x-2">
                    <span class="w-2 h-2 bg-pink-400 rounded-full"></span>
                    <span>Minimalist Çizgiler</span>
                </div>
                <div class="flex items-center space-x-2">
                    <span class="w-2 h-2 bg-pink-400 rounded-full"></span>
                    <span>Taş & Glitter</span>
                </div>
                <div class="flex items-center space-x-2">
                    <span class="w-2 h-2 bg-pink-400 rounded-full"></span>
                    <span>Sezonluk Konseptler</span>
                </div>
            </div>
        </div>
    </div>
</div>
HTML;
    }

    private function getKasKirpikContent(): string
    {
        return <<<'HTML'
<div class="space-y-8">
    <div class="prose prose-lg max-w-none text-gray-600">
        <p class="lead text-xl text-gray-700 font-light">
            Bakışlarınız, ifadenizin en güçlü parçasıdır. Yüz anatomisine ve altın orana uygun profesyonel kaş tasarımı ve kirpik uygulamalarımızla, doğal güzelliğinizi en etkileyici şekilde ortaya çıkarıyoruz.
        </p>

        <div class="my-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div class="bg-gray-50 rounded-2xl p-6 md:p-8 h-full" data-variant="gray">
                <h3 class="text-xl font-serif text-pink-900 mb-2">Kaş Tasarımı</h3>
                <p class="text-xs text-pink-600 uppercase tracking-wider mb-4">İfadenizi Güçlendirin</p>
                <p class="mb-4 text-sm">Yüz şeklinize en uygun kaş formunu belirliyor, iplik, cımbız veya ağda teknikleriyle hassas şekillendirme yapıyoruz.</p>
                <div class="flex flex-wrap gap-2">
                    <span class="px-3 py-1 bg-white text-gray-600 text-xs rounded-full border border-gray-200">Altın Oran</span>
                    <span class="px-3 py-1 bg-white text-gray-600 text-xs rounded-full border border-gray-200">Laminasyon</span>
                </div>
            </div>

            <div class="bg-gray-50 rounded-2xl p-6 md:p-8 h-full" data-variant="gray">
                <h3 class="text-xl font-serif text-pink-900 mb-2">Kirpik Lifting</h3>
                <p class="text-xs text-pink-600 uppercase tracking-wider mb-4">Doğal ve Hacimli</p>
                <p class="mb-4 text-sm">Kendi kirpiklerinizi kökten uca kıvırarak daha uzun, daha dolgun ve daha kıvrık görünmesini sağlayan bakım işlemidir.</p>
                <div class="flex flex-wrap gap-2">
                    <span class="px-3 py-1 bg-white text-gray-600 text-xs rounded-full border border-gray-200">6-8 Hafta</span>
                    <span class="px-3 py-1 bg-white text-gray-600 text-xs rounded-full border border-gray-200">Keratin Bakım</span>
                </div>
            </div>
        </div>

        <div class="bg-gradient-to-r from-pink-50 to-white p-8 rounded-2xl">
            <h3 class="text-2xl font-serif text-gray-900 mb-4">Bakım Sonrası Öneriler</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h4 class="font-bold text-pink-800 mb-2">İlk 24 Saat</h4>
                    <ul class="text-sm space-y-2">
                        <li>Su ile temastan kaçının</li>
                        <li>Makyaj malzemesi kullanmayın</li>
                        <li>Buharlı ortamlardan uzak durun</li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-bold text-pink-800 mb-2">Uzun Süreli Koruma</h4>
                    <ul class="text-sm space-y-2">
                        <li>Yağsız temizleyiciler tercih edin</li>
                        <li>Kaş/kirpik serumu ile besleyin</li>
                        <li>Gözlerinizi ovuşturmaktan kaçının</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
HTML;
    }
}
