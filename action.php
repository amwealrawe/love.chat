ini_set('display_errors', 1);
error_reporting(E_ALL);
 

<?php phpinfo(); 
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // تعامل مع طلب POST
    // منطق تسجيل الدخول هنا
} else {
    // الرد بخطأ للطرق غير المدعومة
    header('HTTP/1.1 501 Not Implemented');
    echo "Unsupported method.";
}

ini_set('display_errors', 1);
error_reporting(E_ALL);

?>
<?php
$dir = "sql";

// تحقق من وجود المجلد وإنشاؤه إذا لم يكن موجوداً
if (!is_dir($dir)) {
    mkdir($dir, 0777, true);
    echo "مجلد 'sql' تم إنشاؤه بنجاح.";
} else {
    echo "المجلد 'sql' موجود بالفعل.";
}
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // تعامل مع طلب POST
    // منطق سجل الدردشة هنا
} else {
    // الرد بخطأ للطرق غير المدعومة
    header('HTTP/1.1 501 Not Implemented');
    echo "Unsupported method.";
}

?>
