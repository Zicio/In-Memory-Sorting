export default class Table {
  constructor(element, data) {
    if (!element) {
      throw new Error('Элемент не существует');
    } else {
      this.element = element;
      this.data = data;
      this.col = null;

      this.transformationRows();
      this.work();
      setInterval(this.work.bind(this), 16000);
    }
  }

  transformationRows() {
    if (this.rows) {
      for (const film of this.rows) {
        film.remove();
      }
    }
    for (const film of this.data) {
      this.element.insertAdjacentHTML(
        'beforeend',
        `<tr class="table__row"><td>#${film.id}</td><td>${film.title}</td><td>(${film.year})</td><td>imdb: ${film.imdb.toFixed(2)}</td></tr>`,
      );
    }
    this.rows = [...this.element.getElementsByClassName('table__row')];
  }

  Sort(parametre, trend) {
    if (trend === '↑') {
      this.data.reverse();
    } else if (parametre === 'title') {
      this.data.sort((a, b) => {
        if (a[parametre].trim().toLowerCase().replace(/ё/g, 'е') < b[parametre].trim().toLowerCase().replace(/ё/g, 'е')) return -1;
        return 1;
      });
    } else {
      this.data.sort((a, b) => a[parametre] - b[parametre]);
    }
    this.transformationRows();
    this.transformationHeader(parametre, trend);
  }

  transformationHeader(parametre, trend) {
    if (this.col) {
      this.col.textContent = this.col.textContent.slice(0, -2);
    }
    this.col = document.querySelector(`.header__${parametre}`);
    this.col.textContent = `${parametre} ${trend}`;
  }

  work() {
    setTimeout(this.Sort.bind(this), 2000, 'id', '↓');
    setTimeout(this.Sort.bind(this), 4000, 'id', '↑');
    setTimeout(this.Sort.bind(this), 6000, 'title', '↓');
    setTimeout(this.Sort.bind(this), 8000, 'title', '↑');
    setTimeout(this.Sort.bind(this), 10000, 'year', '↓');
    setTimeout(this.Sort.bind(this), 12000, 'year', '↑');
    setTimeout(this.Sort.bind(this), 14000, 'imdb', '↓');
    setTimeout(this.Sort.bind(this), 16000, 'imdb', '↑');
  }
}
