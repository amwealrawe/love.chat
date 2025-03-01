<?php phpinfo(); ?>
ini_set('display_errors', 1);
error_reporting(E_ALL);

<?php phpinfo(); ?>
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // تعامل مع طلب POST
    // منطق سجل الدردشة هنا
} else {
    // الرد بخطأ للطرق غير المدعومة
    header('HTTP/1.1 501 Not Implemented');
    echo "Unsupported method.";
}
