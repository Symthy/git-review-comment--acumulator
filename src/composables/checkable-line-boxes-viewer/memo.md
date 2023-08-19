## 設計メモ

コンポーネントをメモ化しない場合のレンダリング

初回

```
CheckableLineBoxesPagination
CheckableLineBoxesPagination - useEffect - initialize() end
CheckableLineBoxesPagination
OrderSelectBox
ItemPerPageSelection
CheckableLineBoxesWithPin
Pagination
handleSelectOrderBy
handleSelectItemsPerPage
handleSelectActivePage

CheckableLineBoxesPagination - useEffect - fetchAllData end
CheckableLineBoxesPagination
OrderSelectBox
ItemPerPageSelection
Pagination
// ◎表示内容が変わっていないため、CheckableLineBoxesWithPin は再レンダリングされていない
```

items per page 変更時

```
CheckableLineBoxesPagination
OrderSelectBox
ItemPerPageSelection
CheckableLineBoxesWithPin
Pagination
handleSelectItemsPerPage
updateCurrentViewItems

CheckableLineBoxesPagination
OrderSelectBox
ItemPerPageSelection
CheckableLineBoxesWithPin
Pagination
```

ページ変更時

```
CheckableLineBoxesPagination
OrderSelectBox
ItemPerPageSelection
Pagination
handleSelectActivePage
updateCurrentViewItems

CheckableLineBoxesPagination
OrderSelectBox
ItemPerPageSelection
CheckableLineBoxesWithPin
Pagination
```

- レンダリングコストが高いのは、CheckableLineBoxesWithPin
  - それ以外はコストが極小なため、メモ化しても意味がない
  - CheckableLineBoxesWithPin は操作する度に毎回レンダリングが必要なコンポーネントのためメモ化する意味もない

メモ化はしない（やってもあまり意味がない）

他コンポーネントと絡むと状況が変わるかもしれないが、それはその時に考える
