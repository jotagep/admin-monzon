export interface Menu {
    titulo: String;
    icono: String;
    submenu:
      {
        titulo: String;
        url: String;
      }[]
    ;
  }
