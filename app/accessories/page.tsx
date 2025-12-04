// components/AccessoriesPage.js 或 AccessoriesPage.jsx
// 这是你需要修改的文件

import Link from "next/link"; // 你可能已经有这个导入，但最好保留

export default function AccessoriesPage() {
    return (
      <div className="p-6">
        {/* 用<a>标签将整个h1标题包裹起来，并指向你的Shopify商店 */}
        <a href="https://phonehero.odoo.com/shop/category/accessories-8" className="hover:underline">
          <h1 className="text-2xl font-bold">Accessories</h1>
        </a>
        <p>Explore our range of phone accessories like cases and screen protectors.</p>
      </div>
    );
}