<?php

namespace Database\Seeders;

use App\Models\Comment;
use Illuminate\Database\Seeder;

class CommentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $testimonials = [
            [
                'rating' => 5,
                'comment' => 'Lazer epilasyon sonuçlarından çok memnunum. Profesyonel ekip ve hijyenik ortam.',
                'name' => 'Ayşe K.',
                'service' => 'Lazer Epilasyon',
            ],
            [
                'rating' => 5,
                'comment' => 'Cilt bakımı seanslarından sonra cildim bambaşka oldu. Kesinlikle tavsiye ederim!',
                'name' => 'Zeynep M.',
                'service' => 'Cilt Bakımı',
            ],
            [
                'rating' => 5,
                'comment' => 'Çok ilgili ve güler yüzlü bir ekip. Her ziyaretimde kendimi özel hissediyorum.',
                'name' => 'Elif S.',
                'service' => 'Güzellik Bakımı',
            ],
            [
                'rating' => 5,
                'comment' => 'Kalıcı makyaj yaptırdım, sonuç beklentilerimin çok üstünde. Artık her sabah makyajsız bile harika görünüyorum!',
                'name' => 'Derya T.',
                'service' => 'Kalıcı Makyaj',
            ],
            [
                'rating' => 5,
                'comment' => 'Kaşlarımın şekli mükemmel oldu. Yüz hatlarım belirginleşti, çok doğal bir görünüm elde ettim.',
                'name' => 'Selin A.',
                'service' => 'Kaş Tasarımı',
            ],
            [
                'rating' => 5,
                'comment' => 'Protez tırnak uygulaması hem dayanıklı hem de çok şık görünüyor. Ellerime hayranım!',
                'name' => 'Merve B.',
                'service' => 'Protez Tırnak',
            ],
            [
                'rating' => 5,
                'comment' => 'İpek kirpik uygulaması çok doğal duruyor. Gözlerim daha büyük ve etkileyici görünüyor.',
                'name' => 'Gamze Y.',
                'service' => 'İpek Kirpik',
            ],
        ];

        foreach ($testimonials as $testimonial) {
            Comment::create([
                'author' => $testimonial['name'] . ' (' . $testimonial['service'] . ')',
                'content' => $testimonial['comment'],
                'rating' => $testimonial['rating'],
                'is_active' => true,
            ]);
        }
    }
}
