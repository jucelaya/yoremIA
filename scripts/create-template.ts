import fs from 'fs';
import path from 'path';
import PizZip from 'pizzip';

export function generateExactUserTemplateDocx() {
  const zip = new PizZip();

  const contentTypesXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
  <Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>
</Types>`;

  const rootRelsXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`;

  const docRelsXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>`;

  const stylesXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:docDefaults>
    <w:rPrDefault>
      <w:rPr>
        <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri" w:cs="Calibri"/>
        <w:sz w:val="21"/>
        <w:color w:val="1F2937"/>
      </w:rPr>
    </w:rPrDefault>
    <w:pPrDefault>
      <w:pPr>
        <w:jc w:val="left"/>
        <w:spacing w:line="240" w:lineRule="auto" w:after="80"/>
      </w:pPr>
    </w:pPrDefault>
  </w:docDefaults>
</w:styles>`;

  const documentXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
    <!-- TITULO PRINCIPAL -->
    <w:p>
      <w:pPr>
        <w:jc w:val="center"/>
        <w:spacing w:after="60"/>
      </w:pPr>
      <w:r>
        <w:rPr>
          <w:b/>
          <w:sz w:val="28"/>
          <w:color w:val="1E3A8A"/>
        </w:rPr>
        <w:t>SESIÓN DE APRENDIZAJE N°</w:t>
      </w:r>
    </w:p>

    <w:p>
      <w:pPr>
        <w:jc w:val="center"/>
        <w:spacing w:after="200"/>
      </w:pPr>
      <w:r>
        <w:rPr>
          <w:b/>
          <w:sz w:val="24"/>
          <w:color w:val="0F172A"/>
        </w:rPr>
        <w:t>“{{titulo_sesion_documento}}”</w:t>
      </w:r>
    </w:p>

    <!-- I. DATOS INFORMATIVOS -->
    <w:p>
      <w:pPr><w:spacing w:before="120" w:after="60"/></w:pPr>
      <w:r>
        <w:rPr><w:b/><w:sz w:val="22"/><w:color w:val="1E3A8A"/></w:rPr>
        <w:t>I. DATOS INFORMATIVOS</w:t>
      </w:r>
    </w:p>

    <w:tbl>
      <w:tblPr>
        <w:tblW w:w="9400" w:type="dxa"/>
        <w:tblBorders>
          <w:top w:val="single" w:sz="6" w:space="0" w:color="94A3B8"/>
          <w:bottom w:val="single" w:sz="6" w:space="0" w:color="94A3B8"/>
          <w:left w:val="single" w:sz="6" w:space="0" w:color="94A3B8"/>
          <w:right w:val="single" w:sz="6" w:space="0" w:color="94A3B8"/>
          <w:insideH w:val="single" w:sz="4" w:space="0" w:color="CBD5E1"/>
          <w:insideV w:val="single" w:sz="4" w:space="0" w:color="CBD5E1"/>
        </w:tblBorders>
      </w:tblPr>

      <w:tr>
        <w:tc>
          <w:tcPr><w:tcW w:w="2800" w:type="dxa"/><w:shd w:val="clear" w:color="auto" w:fill="F1F5F9"/></w:tcPr>
          <w:p><w:r><w:rPr><w:b/></w:rPr><w:t>DOCENTE:</w:t></w:r></w:p>
        </w:tc>
        <w:tc>
          <w:tcPr><w:tcW w:w="6600" w:type="dxa"/></w:tcPr>
          <w:p><w:r><w:t>{{docente}}</w:t></w:r></w:p>
        </w:tc>
      </w:tr>

      <w:tr>
        <w:tc>
          <w:tcPr><w:tcW w:w="2800" w:type="dxa"/><w:shd w:val="clear" w:color="auto" w:fill="F1F5F9"/></w:tcPr>
          <w:p><w:r><w:rPr><w:b/></w:rPr><w:t>DIRECTOR(A):</w:t></w:r></w:p>
        </w:tc>
        <w:tc>
          <w:tcPr><w:tcW w:w="6600" w:type="dxa"/></w:tcPr>
          <w:p><w:r><w:t>{{director}}</w:t></w:r></w:p>
        </w:tc>
      </w:tr>

      <w:tr>
        <w:tc>
          <w:tcPr><w:tcW w:w="2800" w:type="dxa"/><w:shd w:val="clear" w:color="auto" w:fill="F1F5F9"/></w:tcPr>
          <w:p><w:r><w:rPr><w:b/></w:rPr><w:t>INSTITUCIÓN EDUCATIVA:</w:t></w:r></w:p>
        </w:tc>
        <w:tc>
          <w:tcPr><w:tcW w:w="6600" w:type="dxa"/></w:tcPr>
          <w:p><w:r><w:t>{{colegio}}</w:t></w:r></w:p>
        </w:tc>
      </w:tr>

      <w:tr>
        <w:tc>
          <w:tcPr><w:tcW w:w="2800" w:type="dxa"/><w:shd w:val="clear" w:color="auto" w:fill="F1F5F9"/></w:tcPr>
          <w:p><w:r><w:rPr><w:b/></w:rPr><w:t>NIVEL:</w:t></w:r></w:p>
        </w:tc>
        <w:tc>
          <w:tcPr><w:tcW w:w="6600" w:type="dxa"/></w:tcPr>
          <w:p><w:r><w:t>{{nivel}}</w:t></w:r></w:p>
        </w:tc>
      </w:tr>

      <w:tr>
        <w:tc>
          <w:tcPr><w:tcW w:w="2800" w:type="dxa"/><w:shd w:val="clear" w:color="auto" w:fill="F1F5F9"/></w:tcPr>
          <w:p><w:r><w:rPr><w:b/></w:rPr><w:t>GRADO:</w:t></w:r></w:p>
        </w:tc>
        <w:tc>
          <w:tcPr><w:tcW w:w="6600" w:type="dxa"/></w:tcPr>
          <w:p><w:r><w:t>{{grado}}</w:t></w:r></w:p>
        </w:tc>
      </w:tr>

      <w:tr>
        <w:tc>
          <w:tcPr><w:tcW w:w="2800" w:type="dxa"/><w:shd w:val="clear" w:color="auto" w:fill="F1F5F9"/></w:tcPr>
          <w:p><w:r><w:rPr><w:b/></w:rPr><w:t>ÁREA:</w:t></w:r></w:p>
        </w:tc>
        <w:tc>
          <w:tcPr><w:tcW w:w="6600" w:type="dxa"/></w:tcPr>
          <w:p><w:r><w:t>{{area}}</w:t></w:r></w:p>
        </w:tc>
      </w:tr>

      <w:tr>
        <w:tc>
          <w:tcPr><w:tcW w:w="2800" w:type="dxa"/><w:shd w:val="clear" w:color="auto" w:fill="F1F5F9"/></w:tcPr>
          <w:p><w:r><w:rPr><w:b/></w:rPr><w:t>TEMA:</w:t></w:r></w:p>
        </w:tc>
        <w:tc>
          <w:tcPr><w:tcW w:w="6600" w:type="dxa"/></w:tcPr>
          <w:p><w:r><w:t>{{tema}}</w:t></w:r></w:p>
        </w:tc>
      </w:tr>

      <w:tr>
        <w:tc>
          <w:tcPr><w:tcW w:w="2800" w:type="dxa"/><w:shd w:val="clear" w:color="auto" w:fill="F1F5F9"/></w:tcPr>
          <w:p><w:r><w:rPr><w:b/></w:rPr><w:t>FECHA:</w:t></w:r></w:p>
        </w:tc>
        <w:tc>
          <w:tcPr><w:tcW w:w="6600" w:type="dxa"/></w:tcPr>
          <w:p><w:r><w:t>{{fecha}}</w:t></w:r></w:p>
        </w:tc>
      </w:tr>

      <w:tr>
        <w:tc>
          <w:tcPr><w:tcW w:w="2800" w:type="dxa"/><w:shd w:val="clear" w:color="auto" w:fill="F1F5F9"/></w:tcPr>
          <w:p><w:r><w:rPr><w:b/></w:rPr><w:t>DURACIÓN:</w:t></w:r></w:p>
        </w:tc>
        <w:tc>
          <w:tcPr><w:tcW w:w="6600" w:type="dxa"/></w:tcPr>
          <w:p><w:r><w:t>{{duracion_minutos}} minutos</w:t></w:r></w:p>
        </w:tc>
      </w:tr>

      <w:tr>
        <w:tc>
          <w:tcPr><w:tcW w:w="2800" w:type="dxa"/><w:shd w:val="clear" w:color="auto" w:fill="F1F5F9"/></w:tcPr>
          <w:p><w:r><w:rPr><w:b/></w:rPr><w:t>UNIDAD:</w:t></w:r></w:p>
        </w:tc>
        <w:tc>
          <w:tcPr><w:tcW w:w="6600" w:type="dxa"/></w:tcPr>
          <w:p><w:r><w:t>{{titulo_unidad}}</w:t></w:r></w:p>
        </w:tc>
      </w:tr>
    </w:tbl>

    <!-- II. PROPÓSITOS DE APRENDIZAJE DEL CNEB -->
    <w:p>
      <w:pPr><w:spacing w:before="160" w:after="60"/></w:pPr>
      <w:r>
        <w:rPr><w:b/><w:sz w:val="22"/><w:color w:val="1E3A8A"/></w:rPr>
        <w:t>II. PROPÓSITOS DE APRENDIZAJE DEL CNEB</w:t>
      </w:r>
    </w:p>

    <w:tbl>
      <w:tblPr>
        <w:tblW w:w="9400" w:type="dxa"/>
        <w:tblBorders>
          <w:top w:val="single" w:sz="6" w:space="0" w:color="94A3B8"/>
          <w:bottom w:val="single" w:sz="6" w:space="0" w:color="94A3B8"/>
          <w:left w:val="single" w:sz="6" w:space="0" w:color="94A3B8"/>
          <w:right w:val="single" w:sz="6" w:space="0" w:color="94A3B8"/>
          <w:insideH w:val="single" w:sz="4" w:space="0" w:color="CBD5E1"/>
          <w:insideV w:val="single" w:sz="4" w:space="0" w:color="CBD5E1"/>
        </w:tblBorders>
      </w:tblPr>

      <w:tr>
        <w:tc>
          <w:tcPr><w:tcW w:w="3400" w:type="dxa"/><w:shd w:val="clear" w:color="auto" w:fill="E2E8F0"/></w:tcPr>
          <w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:rPr><w:b/></w:rPr><w:t>COMPETENCIA PRINCIPAL Y CAPACIDADES</w:t></w:r></w:p>
        </w:tc>
        <w:tc>
          <w:tcPr><w:tcW w:w="3000" w:type="dxa"/><w:shd w:val="clear" w:color="auto" w:fill="E2E8F0"/></w:tcPr>
          <w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:rPr><w:b/></w:rPr><w:t>DESEMPEÑOS DEL GRADO</w:t></w:r></w:p>
        </w:tc>
        <w:tc>
          <w:tcPr><w:tcW w:w="3000" w:type="dxa"/><w:shd w:val="clear" w:color="auto" w:fill="E2E8F0"/></w:tcPr>
          <w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:rPr><w:b/></w:rPr><w:t>CRITERIOS DE EVALUACIÓN</w:t></w:r></w:p>
        </w:tc>
      </w:tr>

      <w:tr>
        <w:tc>
          <w:tcPr><w:tcW w:w="3400" w:type="dxa"/></w:tcPr>
          <w:p><w:r><w:rPr><w:b/></w:rPr><w:t>{{competencia_1}}</w:t></w:r></w:p>
          <w:p><w:r><w:t>{{capacidades_1}}</w:t></w:r></w:p>
        </w:tc>
        <w:tc>
          <w:tcPr><w:tcW w:w="3000" w:type="dxa"/></w:tcPr>
          <w:p><w:r><w:t>{{desempenos}}</w:t></w:r></w:p>
        </w:tc>
        <w:tc>
          <w:tcPr><w:tcW w:w="3000" w:type="dxa"/></w:tcPr>
          <w:p><w:r><w:t>{{criterios}}</w:t></w:r></w:p>
        </w:tc>
      </w:tr>

      {{#hay_competencia_2}}
      <w:tr>
        <w:tc>
          <w:tcPr><w:tcW w:w="3400" w:type="dxa"/><w:shd w:val="clear" w:color="auto" w:fill="F8FAFC"/></w:tcPr>
          <w:p><w:r><w:rPr><w:b/></w:rPr><w:t>COMPETENCIA DE APOYO:</w:t></w:r></w:p>
          <w:p><w:r><w:t>{{competencia_2}}</w:t></w:r></w:p>
        </w:tc>
        <w:tc>
          <w:tcPr><w:gridSpan w:val="2"/><w:tcW w:w="6000" w:type="dxa"/></w:tcPr>
          <w:p><w:r><w:rPr><w:b/></w:rPr><w:t>CAPACIDADES:</w:t></w:r></w:p>
          <w:p><w:r><w:t>{{capacidades_2}}</w:t></w:r></w:p>
        </w:tc>
      </w:tr>
      {{/hay_competencia_2}}

      <w:tr>
        <w:tc>
          <w:tcPr><w:tcW w:w="3400" w:type="dxa"/><w:shd w:val="clear" w:color="auto" w:fill="F1F5F9"/></w:tcPr>
          <w:p><w:r><w:rPr><w:b/></w:rPr><w:t>ESTÁNDAR DEL CICLO</w:t></w:r></w:p>
          <w:p><w:r><w:rPr><w:i/><w:sz w:val="18"/></w:rPr><w:t>(lo que se espera al final del ciclo)</w:t></w:r></w:p>
        </w:tc>
        <w:tc>
          <w:tcPr><w:gridSpan w:val="2"/><w:tcW w:w="6000" w:type="dxa"/></w:tcPr>
          <w:p><w:r><w:t>{{estandares}}</w:t></w:r></w:p>
        </w:tc>
      </w:tr>
    </w:tbl>

    <!-- III. ALINEAMIENTO PEDAGÓGICO DE LA SESIÓN -->
    <w:p>
      <w:pPr><w:spacing w:before="160" w:after="60"/></w:pPr>
      <w:r>
        <w:rPr><w:b/><w:sz w:val="22"/><w:color w:val="1E3A8A"/></w:rPr>
        <w:t>III. ALINEAMIENTO PEDAGÓGICO DE LA SESIÓN</w:t>
      </w:r>
    </w:p>

    <w:tbl>
      <w:tblPr>
        <w:tblW w:w="9400" w:type="dxa"/>
        <w:tblBorders>
          <w:top w:val="single" w:sz="6" w:space="0" w:color="94A3B8"/>
          <w:bottom w:val="single" w:sz="6" w:space="0" w:color="94A3B8"/>
          <w:left w:val="single" w:sz="6" w:space="0" w:color="94A3B8"/>
          <w:right w:val="single" w:sz="6" w:space="0" w:color="94A3B8"/>
          <w:insideH w:val="single" w:sz="4" w:space="0" w:color="CBD5E1"/>
          <w:insideV w:val="single" w:sz="4" w:space="0" w:color="CBD5E1"/>
        </w:tblBorders>
      </w:tblPr>

      <w:tr>
        <w:tc>
          <w:tcPr><w:tcW w:w="3100" w:type="dxa"/><w:shd w:val="clear" w:color="auto" w:fill="E2E8F0"/></w:tcPr>
          <w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:rPr><w:b/></w:rPr><w:t>PROPÓSITO</w:t></w:r></w:p>
        </w:tc>
        <w:tc>
          <w:tcPr><w:tcW w:w="3200" w:type="dxa"/><w:shd w:val="clear" w:color="auto" w:fill="E2E8F0"/></w:tcPr>
          <w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:rPr><w:b/></w:rPr><w:t>RETO Y SITUACIÓN SIGNIFICATIVA</w:t></w:r></w:p>
        </w:tc>
        <w:tc>
          <w:tcPr><w:tcW w:w="3100" w:type="dxa"/><w:shd w:val="clear" w:color="auto" w:fill="E2E8F0"/></w:tcPr>
          <w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:rPr><w:b/></w:rPr><w:t>EVIDENCIA</w:t></w:r></w:p>
        </w:tc>
      </w:tr>

      <w:tr>
        <w:tc>
          <w:tcPr><w:tcW w:w="3100" w:type="dxa"/></w:tcPr>
          <w:p><w:r><w:t>{{proposito}}</w:t></w:r></w:p>
        </w:tc>
        <w:tc>
          <w:tcPr><w:tcW w:w="3200" w:type="dxa"/></w:tcPr>
          <w:p><w:r><w:rPr><w:b/></w:rPr><w:t>Reto:</w:t></w:r></w:p>
          <w:p><w:r><w:t>{{reto}}</w:t></w:r></w:p>
          <w:p><w:r><w:rPr><w:b/></w:rPr><w:t>Situación Significativa:</w:t></w:r></w:p>
          <w:p><w:r><w:t>{{situacion_significativa}}</w:t></w:r></w:p>
        </w:tc>
        <w:tc>
          <w:tcPr><w:tcW w:w="3100" w:type="dxa"/></w:tcPr>
          <w:p><w:r><w:t>{{evidencia_1}}</w:t></w:r></w:p>
        </w:tc>
      </w:tr>

      <w:tr>
        <w:tc>
          <w:tcPr><w:tcW w:w="3100" w:type="dxa"/><w:shd w:val="clear" w:color="auto" w:fill="F1F5F9"/></w:tcPr>
          <w:p><w:r><w:rPr><w:b/></w:rPr><w:t>PRODUCTO:</w:t></w:r></w:p>
        </w:tc>
        <w:tc>
          <w:tcPr><w:gridSpan w:val="2"/><w:tcW w:w="6300" w:type="dxa"/></w:tcPr>
          <w:p><w:r><w:t>{{producto}}</w:t></w:r></w:p>
        </w:tc>
      </w:tr>

      <w:tr>
        <w:tc>
          <w:tcPr><w:tcW w:w="3100" w:type="dxa"/><w:shd w:val="clear" w:color="auto" w:fill="F1F5F9"/></w:tcPr>
          <w:p><w:r><w:rPr><w:b/></w:rPr><w:t>NECESIDADES DE APRENDIZAJE:</w:t></w:r></w:p>
        </w:tc>
        <w:tc>
          <w:tcPr><w:gridSpan w:val="2"/><w:tcW w:w="6300" w:type="dxa"/></w:tcPr>
          <w:p><w:r><w:t>{{necesidades_aprendizaje}}</w:t></w:r></w:p>
        </w:tc>
      </w:tr>

      <w:tr>
        <w:tc>
          <w:tcPr><w:tcW w:w="3100" w:type="dxa"/><w:shd w:val="clear" w:color="auto" w:fill="F1F5F9"/></w:tcPr>
          <w:p><w:r><w:rPr><w:b/></w:rPr><w:t>INSTRUMENTO DE EVALUACIÓN:</w:t></w:r></w:p>
        </w:tc>
        <w:tc>
          <w:tcPr><w:gridSpan w:val="2"/><w:tcW w:w="6300" w:type="dxa"/></w:tcPr>
          <w:p><w:r><w:rPr><w:b/></w:rPr><w:t>{{instrumento_nombre}}</w:t></w:r></w:p>
        </w:tc>
      </w:tr>
    </w:tbl>

    <!-- IV. COMPETENCIAS TRANSVERSALES -->
    <w:p>
      <w:pPr><w:spacing w:before="160" w:after="60"/></w:pPr>
      <w:r>
        <w:rPr><w:b/><w:sz w:val="22"/><w:color w:val="1E3A8A"/></w:rPr>
        <w:t>IV. COMPETENCIAS TRANSVERSALES</w:t>
      </w:r>
    </w:p>

    <w:tbl>
      <w:tblPr>
        <w:tblW w:w="9400" w:type="dxa"/>
        <w:tblBorders>
          <w:top w:val="single" w:sz="6" w:space="0" w:color="94A3B8"/>
          <w:bottom w:val="single" w:sz="6" w:space="0" w:color="94A3B8"/>
          <w:left w:val="single" w:sz="6" w:space="0" w:color="94A3B8"/>
          <w:right w:val="single" w:sz="6" w:space="0" w:color="94A3B8"/>
          <w:insideH w:val="single" w:sz="4" w:space="0" w:color="CBD5E1"/>
          <w:insideV w:val="single" w:sz="4" w:space="0" w:color="CBD5E1"/>
        </w:tblBorders>
      </w:tblPr>

      <w:tr>
        <w:tc>
          <w:tcPr><w:tcW w:w="2500" w:type="dxa"/><w:shd w:val="clear" w:color="auto" w:fill="E2E8F0"/></w:tcPr>
          <w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:rPr><w:b/></w:rPr><w:t>COMPETENCIAS / CAPACIDADES</w:t></w:r></w:p>
        </w:tc>
        <w:tc>
          <w:tcPr><w:tcW w:w="2300" w:type="dxa"/><w:shd w:val="clear" w:color="auto" w:fill="E2E8F0"/></w:tcPr>
          <w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:rPr><w:b/></w:rPr><w:t>ESTÁNDAR</w:t></w:r></w:p>
        </w:tc>
        <w:tc>
          <w:tcPr><w:tcW w:w="2300" w:type="dxa"/><w:shd w:val="clear" w:color="auto" w:fill="E2E8F0"/></w:tcPr>
          <w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:rPr><w:b/></w:rPr><w:t>DESEMPEÑOS</w:t></w:r></w:p>
        </w:tc>
        <w:tc>
          <w:tcPr><w:tcW w:w="2300" w:type="dxa"/><w:shd w:val="clear" w:color="auto" w:fill="E2E8F0"/></w:tcPr>
          <w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:rPr><w:b/></w:rPr><w:t>SE EVIDENCIA CUANDO</w:t></w:r></w:p>
        </w:tc>
      </w:tr>

      <w:tr>
        <w:tc>
          <w:tcPr><w:tcW w:w="2500" w:type="dxa"/></w:tcPr>
          <w:p><w:r><w:rPr><w:b/></w:rPr><w:t>{{transversal_1_nombre}}</w:t></w:r></w:p>
          <w:p><w:r><w:rPr><w:b/></w:rPr><w:t>CAPACIDADES:</w:t></w:r></w:p>
          <w:p><w:r><w:t>{{transversal_1_capacidades}}</w:t></w:r></w:p>
        </w:tc>
        <w:tc>
          <w:tcPr><w:tcW w:w="2300" w:type="dxa"/></w:tcPr>
          <w:p><w:r><w:t>{{transversal_1_estandar}}</w:t></w:r></w:p>
        </w:tc>
        <w:tc>
          <w:tcPr><w:tcW w:w="2300" w:type="dxa"/></w:tcPr>
          <w:p><w:r><w:t>{{transversal_1_desempeno}}</w:t></w:r></w:p>
        </w:tc>
        <w:tc>
          <w:tcPr><w:tcW w:w="2300" w:type="dxa"/></w:tcPr>
          <w:p><w:r><w:t>{{transversal_1_evidencia}}</w:t></w:r></w:p>
        </w:tc>
      </w:tr>

      <w:tr>
        <w:tc>
          <w:tcPr><w:tcW w:w="2500" w:type="dxa"/></w:tcPr>
          <w:p><w:r><w:rPr><w:b/></w:rPr><w:t>{{transversal_2_nombre}}</w:t></w:r></w:p>
          <w:p><w:r><w:rPr><w:b/></w:rPr><w:t>CAPACIDADES:</w:t></w:r></w:p>
          <w:p><w:r><w:t>{{transversal_2_capacidades}}</w:t></w:r></w:p>
        </w:tc>
        <w:tc>
          <w:tcPr><w:tcW w:w="2300" w:type="dxa"/></w:tcPr>
          <w:p><w:r><w:t>{{transversal_2_estandar}}</w:t></w:r></w:p>
        </w:tc>
        <w:tc>
          <w:tcPr><w:tcW w:w="2300" w:type="dxa"/></w:tcPr>
          <w:p><w:r><w:t>{{transversal_2_desempeno}}</w:t></w:r></w:p>
        </w:tc>
        <w:tc>
          <w:tcPr><w:tcW w:w="2300" w:type="dxa"/></w:tcPr>
          <w:p><w:r><w:t>{{transversal_2_evidencia}}</w:t></w:r></w:p>
        </w:tc>
      </w:tr>
    </w:tbl>

    <!-- V. ENFOQUES TRANSVERSALES / ATENCIÓN A LA DIVERSIDAD / DUA 2026 -->
    <w:p>
      <w:pPr><w:spacing w:before="160" w:after="60"/></w:pPr>
      <w:r>
        <w:rPr><w:b/><w:sz w:val="22"/><w:color w:val="1E3A8A"/></w:rPr>
        <w:t>V. ENFOQUES TRANSVERSALES / ATENCIÓN A LA DIVERSIDAD / DUA 2026</w:t>
      </w:r>
    </w:p>

    <w:tbl>
      <w:tblPr>
        <w:tblW w:w="9400" w:type="dxa"/>
        <w:tblBorders>
          <w:top w:val="single" w:sz="6" w:space="0" w:color="94A3B8"/>
          <w:bottom w:val="single" w:sz="6" w:space="0" w:color="94A3B8"/>
          <w:left w:val="single" w:sz="6" w:space="0" w:color="94A3B8"/>
          <w:right w:val="single" w:sz="6" w:space="0" w:color="94A3B8"/>
          <w:insideH w:val="single" w:sz="4" w:space="0" w:color="CBD5E1"/>
          <w:insideV w:val="single" w:sz="4" w:space="0" w:color="CBD5E1"/>
        </w:tblBorders>
      </w:tblPr>

      <w:tr>
        <w:tc>
          <w:tcPr><w:tcW w:w="3100" w:type="dxa"/><w:shd w:val="clear" w:color="auto" w:fill="E2E8F0"/></w:tcPr>
          <w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:rPr><w:b/></w:rPr><w:t>ENFOQUES TRANSVERSALES</w:t></w:r></w:p>
        </w:tc>
        <w:tc>
          <w:tcPr><w:tcW w:w="3100" w:type="dxa"/><w:shd w:val="clear" w:color="auto" w:fill="E2E8F0"/></w:tcPr>
          <w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:rPr><w:b/></w:rPr><w:t>VALORES</w:t></w:r></w:p>
        </w:tc>
        <w:tc>
          <w:tcPr><w:tcW w:w="3200" w:type="dxa"/><w:shd w:val="clear" w:color="auto" w:fill="E2E8F0"/></w:tcPr>
          <w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:rPr><w:b/></w:rPr><w:t>ACCIONES O ACTITUDES OBSERVABLES</w:t></w:r></w:p>
        </w:tc>
      </w:tr>

      <w:tr>
        <w:tc>
          <w:tcPr><w:tcW w:w="3100" w:type="dxa"/></w:tcPr>
          <w:p><w:r><w:t>{{enfoque_transversal_1}}</w:t></w:r></w:p>
        </w:tc>
        <w:tc>
          <w:tcPr><w:tcW w:w="3100" w:type="dxa"/></w:tcPr>
          <w:p><w:r><w:t>{{enfoque_transversal_valor_1}}</w:t></w:r></w:p>
        </w:tc>
        <w:tc>
          <w:tcPr><w:tcW w:w="3200" w:type="dxa"/></w:tcPr>
          <w:p><w:r><w:t>{{enfoque_transversal_actitud_1}}</w:t></w:r></w:p>
        </w:tc>
      </w:tr>

      <w:tr>
        <w:tc>
          <w:tcPr><w:tcW w:w="3100" w:type="dxa"/></w:tcPr>
          <w:p><w:r><w:t>{{enfoque_transversal_2}}</w:t></w:r></w:p>
        </w:tc>
        <w:tc>
          <w:tcPr><w:tcW w:w="3100" w:type="dxa"/></w:tcPr>
          <w:p><w:r><w:t>{{enfoque_transversal_valor_2}}</w:t></w:r></w:p>
        </w:tc>
        <w:tc>
          <w:tcPr><w:tcW w:w="3200" w:type="dxa"/></w:tcPr>
          <w:p><w:r><w:t>{{enfoque_transversal_actitud_2}}</w:t></w:r></w:p>
        </w:tc>
      </w:tr>

      <w:tr>
        <w:tc>
          <w:tcPr><w:tcW w:w="3100" w:type="dxa"/><w:shd w:val="clear" w:color="auto" w:fill="F1F5F9"/></w:tcPr>
          <w:p><w:r><w:rPr><w:b/></w:rPr><w:t>DISEÑO UNIVERSAL PARA EL APRENDIZAJE (DUA) / ATENCIÓN A LA DIVERSIDAD:</w:t></w:r></w:p>
        </w:tc>
        <w:tc>
          <w:tcPr><w:gridSpan w:val="2"/><w:tcW w:w="6300" w:type="dxa"/></w:tcPr>
          <w:p><w:r><w:t>{{consideraciones_diversidad}}</w:t></w:r></w:p>
        </w:tc>
      </w:tr>

      <w:tr>
        <w:tc>
          <w:tcPr><w:tcW w:w="3100" w:type="dxa"/><w:shd w:val="clear" w:color="auto" w:fill="F1F5F9"/></w:tcPr>
          <w:p><w:r><w:rPr><w:b/></w:rPr><w:t>DUA SEGÚN CONTEXTO:</w:t></w:r></w:p>
        </w:tc>
        <w:tc>
          <w:tcPr><w:gridSpan w:val="2"/><w:tcW w:w="6300" w:type="dxa"/></w:tcPr>
          <w:p><w:r><w:t>{{dua}}</w:t></w:r></w:p>
        </w:tc>
      </w:tr>

      <w:tr>
        <w:tc>
          <w:tcPr><w:tcW w:w="3100" w:type="dxa"/><w:shd w:val="clear" w:color="auto" w:fill="F1F5F9"/></w:tcPr>
          <w:p><w:r><w:rPr><w:b/></w:rPr><w:t>TRABAJO ENTRE PARES:</w:t></w:r></w:p>
        </w:tc>
        <w:tc>
          <w:tcPr><w:gridSpan w:val="2"/><w:tcW w:w="6300" w:type="dxa"/></w:tcPr>
          <w:p><w:r><w:t>{{trabajo_entre_pares}}</w:t></w:r></w:p>
        </w:tc>
      </w:tr>
    </w:tbl>

    <!-- VI. PROCESOS PEDAGÓGICOS Y ACTIVIDADES -->
    <w:p>
      <w:pPr><w:spacing w:before="160" w:after="60"/></w:pPr>
      <w:r>
        <w:rPr><w:b/><w:sz w:val="22"/><w:color w:val="1E3A8A"/></w:rPr>
        <w:t>VI. PROCESOS PEDAGÓGICOS Y ACTIVIDADES</w:t>
      </w:r>
    </w:p>

    <w:tbl>
      <w:tblPr>
        <w:tblW w:w="9400" w:type="dxa"/>
        <w:tblBorders>
          <w:top w:val="single" w:sz="6" w:space="0" w:color="94A3B8"/>
          <w:bottom w:val="single" w:sz="6" w:space="0" w:color="94A3B8"/>
          <w:left w:val="single" w:sz="6" w:space="0" w:color="94A3B8"/>
          <w:right w:val="single" w:sz="6" w:space="0" w:color="94A3B8"/>
          <w:insideH w:val="single" w:sz="4" w:space="0" w:color="CBD5E1"/>
          <w:insideV w:val="single" w:sz="4" w:space="0" w:color="CBD5E1"/>
        </w:tblBorders>
      </w:tblPr>

      <w:tr>
        <w:tc>
          <w:tcPr><w:tcW w:w="2200" w:type="dxa"/><w:shd w:val="clear" w:color="auto" w:fill="E2E8F0"/></w:tcPr>
          <w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:rPr><w:b/></w:rPr><w:t>INICIO</w:t></w:r></w:p>
        </w:tc>
        <w:tc>
          <w:tcPr><w:tcW w:w="7200" w:type="dxa"/></w:tcPr>
          <w:p><w:r><w:t>{{inicio}}</w:t></w:r></w:p>
        </w:tc>
      </w:tr>

      <w:tr>
        <w:tc>
          <w:tcPr><w:tcW w:w="2200" w:type="dxa"/><w:shd w:val="clear" w:color="auto" w:fill="E2E8F0"/></w:tcPr>
          <w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:rPr><w:b/></w:rPr><w:t>DESARROLLO</w:t></w:r></w:p>
        </w:tc>
        <w:tc>
          <w:tcPr><w:tcW w:w="7200" w:type="dxa"/></w:tcPr>
          <w:p><w:r><w:t>{{desarrollo}}</w:t></w:r></w:p>
        </w:tc>
      </w:tr>

      <w:tr>
        <w:tc>
          <w:tcPr><w:tcW w:w="2200" w:type="dxa"/><w:shd w:val="clear" w:color="auto" w:fill="E2E8F0"/></w:tcPr>
          <w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:rPr><w:b/></w:rPr><w:t>CIERRE</w:t></w:r></w:p>
        </w:tc>
        <w:tc>
          <w:tcPr><w:tcW w:w="7200" w:type="dxa"/></w:tcPr>
          <w:p><w:r><w:t>{{cierre}}</w:t></w:r></w:p>
        </w:tc>
      </w:tr>
    </w:tbl>

    <!-- VII. ESTUDIANTE CON NECESIDADES EDUCATIVAS ESPECIALES (NEE) -->
    {{#hay_adaptaciones}}
    <w:p>
      <w:pPr><w:spacing w:before="160" w:after="60"/></w:pPr>
      <w:r>
        <w:rPr><w:b/><w:sz w:val="22"/><w:color w:val="1E3A8A"/></w:rPr>
        <w:t>VII. ESTUDIANTE CON NECESIDADES EDUCATIVAS ESPECIALES (NEE)</w:t>
      </w:r>
    </w:p>

    <w:tbl>
      <w:tblPr>
        <w:tblW w:w="9400" w:type="dxa"/>
        <w:tblBorders>
          <w:top w:val="single" w:sz="6" w:space="0" w:color="94A3B8"/>
          <w:bottom w:val="single" w:sz="6" w:space="0" w:color="94A3B8"/>
          <w:left w:val="single" w:sz="6" w:space="0" w:color="94A3B8"/>
          <w:right w:val="single" w:sz="6" w:space="0" w:color="94A3B8"/>
          <w:insideH w:val="single" w:sz="4" w:space="0" w:color="CBD5E1"/>
          <w:insideV w:val="single" w:sz="4" w:space="0" w:color="CBD5E1"/>
        </w:tblBorders>
      </w:tblPr>

      <w:tr>
        <w:tc>
          <w:tcPr><w:tcW w:w="3500" w:type="dxa"/><w:shd w:val="clear" w:color="auto" w:fill="E2E8F0"/></w:tcPr>
          <w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:rPr><w:b/></w:rPr><w:t>NOMBRE DEL ALUMNO</w:t></w:r></w:p>
        </w:tc>
        <w:tc>
          <w:tcPr><w:tcW w:w="5900" w:type="dxa"/><w:shd w:val="clear" w:color="auto" w:fill="E2E8F0"/></w:tcPr>
          <w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:rPr><w:b/></w:rPr><w:t>ACTIVIDAD DENTRO DE LA SESIÓN</w:t></w:r></w:p>
        </w:tc>
      </w:tr>

      {{#hay_adaptaciones_1}}
      <w:tr>
        <w:tc>
          <w:tcPr><w:tcW w:w="3500" w:type="dxa"/></w:tcPr>
          <w:p><w:r><w:t>{{adaptaciones_1}}</w:t></w:r></w:p>
        </w:tc>
        <w:tc>
          <w:tcPr><w:tcW w:w="5900" w:type="dxa"/></w:tcPr>
          <w:p><w:r><w:t>{{adaptaciones_actividad_1}}</w:t></w:r></w:p>
        </w:tc>
      </w:tr>
      {{/hay_adaptaciones_1}}

      {{#hay_adaptaciones_2}}
      <w:tr>
        <w:tc>
          <w:tcPr><w:tcW w:w="3500" w:type="dxa"/></w:tcPr>
          <w:p><w:r><w:t>{{adaptaciones_2}}</w:t></w:r></w:p>
        </w:tc>
        <w:tc>
          <w:tcPr><w:tcW w:w="5900" w:type="dxa"/></w:tcPr>
          <w:p><w:r><w:t>{{adaptaciones_actividad_2}}</w:t></w:r></w:p>
        </w:tc>
      </w:tr>
      {{/hay_adaptaciones_2}}

      {{#hay_adaptaciones_3}}
      <w:tr>
        <w:tc>
          <w:tcPr><w:tcW w:w="3500" w:type="dxa"/></w:tcPr>
          <w:p><w:r><w:t>{{adaptaciones_3}}</w:t></w:r></w:p>
        </w:tc>
        <w:tc>
          <w:tcPr><w:tcW w:w="5900" w:type="dxa"/></w:tcPr>
          <w:p><w:r><w:t>{{adaptaciones_actividad_3}}</w:t></w:r></w:p>
        </w:tc>
      </w:tr>
      {{/hay_adaptaciones_3}}
    </w:tbl>
    {{/hay_adaptaciones}}

    <!-- VIII. SOPORTE PEDAGÓGICO Y FUENTES DE CONSULTA -->
    <w:p>
      <w:pPr><w:spacing w:before="160" w:after="60"/></w:pPr>
      <w:r>
        <w:rPr><w:b/><w:sz w:val="22"/><w:color w:val="1E3A8A"/></w:rPr>
        <w:t>VIII. SOPORTE PEDAGÓGICO Y FUENTES DE CONSULTA</w:t>
      </w:r>
    </w:p>

    <w:tbl>
      <w:tblPr>
        <w:tblW w:w="9400" w:type="dxa"/>
        <w:tblBorders>
          <w:top w:val="single" w:sz="6" w:space="0" w:color="94A3B8"/>
          <w:bottom w:val="single" w:sz="6" w:space="0" w:color="94A3B8"/>
          <w:left w:val="single" w:sz="6" w:space="0" w:color="94A3B8"/>
          <w:right w:val="single" w:sz="6" w:space="0" w:color="94A3B8"/>
          <w:insideH w:val="single" w:sz="4" w:space="0" w:color="CBD5E1"/>
          <w:insideV w:val="single" w:sz="4" w:space="0" w:color="CBD5E1"/>
        </w:tblBorders>
      </w:tblPr>

      <w:tr>
        <w:tc>
          <w:tcPr><w:tcW w:w="3100" w:type="dxa"/><w:shd w:val="clear" w:color="auto" w:fill="E2E8F0"/></w:tcPr>
          <w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:rPr><w:b/></w:rPr><w:t>REFERENCIAS</w:t></w:r></w:p>
        </w:tc>
        <w:tc>
          <w:tcPr><w:tcW w:w="3100" w:type="dxa"/><w:shd w:val="clear" w:color="auto" w:fill="E2E8F0"/></w:tcPr>
          <w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:rPr><w:b/></w:rPr><w:t>RECURSOS</w:t></w:r></w:p>
        </w:tc>
        <w:tc>
          <w:tcPr><w:tcW w:w="3200" w:type="dxa"/><w:shd w:val="clear" w:color="auto" w:fill="E2E8F0"/></w:tcPr>
          <w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:rPr><w:b/></w:rPr><w:t>MATERIALES</w:t></w:r></w:p>
        </w:tc>
      </w:tr>

      <w:tr>
        <w:tc>
          <w:tcPr><w:tcW w:w="3100" w:type="dxa"/></w:tcPr>
          <w:p><w:r><w:t>{{referencias}}</w:t></w:r></w:p>
        </w:tc>
        <w:tc>
          <w:tcPr><w:tcW w:w="3100" w:type="dxa"/></w:tcPr>
          <w:p><w:r><w:t>{{recursos}}</w:t></w:r></w:p>
        </w:tc>
        <w:tc>
          <w:tcPr><w:tcW w:w="3200" w:type="dxa"/></w:tcPr>
          <w:p><w:r><w:t>{{materiales}}</w:t></w:r></w:p>
        </w:tc>
      </w:tr>
    </w:tbl>

    <!-- FIRMAS -->
    <w:p><w:pPr><w:spacing w:before="600" w:after="160"/></w:pPr></w:p>
    <w:tbl>
      <w:tblPr>
        <w:tblW w:w="9400" w:type="dxa"/>
        <w:tblBorders>
          <w:top w:val="none"/>
          <w:left w:val="none"/>
          <w:bottom w:val="none"/>
          <w:right w:val="none"/>
          <w:insideH w:val="none"/>
          <w:insideV w:val="none"/>
        </w:tblBorders>
      </w:tblPr>
      <w:tr>
        <w:tc>
          <w:tcPr><w:tcW w:w="4700" w:type="dxa"/></w:tcPr>
          <w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:t>_____________________________</w:t></w:r></w:p>
          <w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:rPr><w:b/></w:rPr><w:t>DOCENTE DEL ÁREA</w:t></w:r></w:p>
          <w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:t>{{docente}}</w:t></w:r></w:p>
        </w:tc>
        <w:tc>
          <w:tcPr><w:tcW w:w="4700" w:type="dxa"/></w:tcPr>
          <w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:t>____________________________</w:t></w:r></w:p>
          <w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:rPr><w:b/></w:rPr><w:t>DIRECTOR/COORDINADOR</w:t></w:r></w:p>
          <w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:t>{{director}}</w:t></w:r></w:p>
        </w:tc>
      </w:tr>
    </w:tbl>

    <!-- ANEXO I: SÍNTESIS CONCEPTUAL Y MARCO TEÓRICO -->
    <w:p>
      <w:pPr>
        <w:pageBreakBefore/>
        <w:jc w:val="left"/>
        <w:spacing w:before="240" w:after="100"/>
      </w:pPr>
      <w:r>
        <w:rPr><w:b/><w:sz w:val="24"/><w:color w:val="1E3A8A"/></w:rPr>
        <w:t>ANEXO I: SÍNTESIS CONCEPTUAL Y MARCO TEÓRICO</w:t>
      </w:r>
    </w:p>

    <w:tbl>
      <w:tblPr>
        <w:tblW w:w="9400" w:type="dxa"/>
        <w:tblBorders>
          <w:top w:val="single" w:sz="6" w:space="0" w:color="94A3B8"/>
          <w:bottom w:val="single" w:sz="6" w:space="0" w:color="94A3B8"/>
          <w:left w:val="single" w:sz="6" w:space="0" w:color="94A3B8"/>
          <w:right w:val="single" w:sz="6" w:space="0" w:color="94A3B8"/>
          <w:insideH w:val="single" w:sz="4" w:space="0" w:color="CBD5E1"/>
          <w:insideV w:val="single" w:sz="4" w:space="0" w:color="CBD5E1"/>
        </w:tblBorders>
      </w:tblPr>
      <w:tr>
        <w:tc>
          <w:tcPr>
            <w:tcW w:w="9400" w:type="dxa"/>
            <w:shd w:val="clear" w:color="auto" w:fill="E2E8F0"/>
          </w:tcPr>
          <w:p>
            <w:pPr><w:jc w:val="left"/><w:spacing w:before="60" w:after="60"/></w:pPr>
            <w:r>
              <w:rPr><w:b/><w:color w:val="1E3A8A"/></w:rPr>
              <w:t>SÍNTESIS CONCEPTUAL (SUSTENTO DISCIPLINAR PARA EL ESTUDIANTE)</w:t>
            </w:r>
          </w:p>
        </w:tc>
      </w:tr>
      <w:tr>
        <w:tc>
          <w:tcPr>
            <w:tcW w:w="9400" w:type="dxa"/>
            <w:tcMar>
              <w:top w:w="160" w:type="dxa"/>
              <w:bottom w:w="160" w:type="dxa"/>
              <w:left w:w="220" w:type="dxa"/>
              <w:right w:w="220" w:type="dxa"/>
            </w:tcMar>
          </w:tcPr>
          <w:p>
            <w:pPr>
              <w:jc w:val="left"/>
              <w:spacing w:line="280" w:lineRule="auto" w:before="60" w:after="80"/>
            </w:pPr>
            <w:r>
              <w:rPr><w:sz w:val="21"/><w:color w:val="1F2937"/></w:rPr>
              <w:t>{{teoria}}</w:t>
            </w:r>
          </w:p>
        </w:tc>
      </w:tr>
    </w:tbl>

    <!-- ANEXO II: INSTRUMENTO DE EVALUACIÓN FORMATIVA -->
    <w:p>
      <w:pPr>
        <w:pageBreakBefore/>
        <w:jc w:val="left"/>
        <w:spacing w:before="240" w:after="100"/>
      </w:pPr>
      <w:r>
        <w:rPr><w:b/><w:sz w:val="24"/><w:color w:val="1E3A8A"/></w:rPr>
        <w:t>ANEXO II: INSTRUMENTO DE EVALUACIÓN FORMATIVA</w:t>
      </w:r>
    </w:p>

    <w:tbl>
      <w:tblPr>
        <w:tblW w:w="9400" w:type="dxa"/>
        <w:tblBorders>
          <w:top w:val="single" w:sz="6" w:space="0" w:color="94A3B8"/>
          <w:bottom w:val="single" w:sz="6" w:space="0" w:color="94A3B8"/>
          <w:left w:val="single" w:sz="6" w:space="0" w:color="94A3B8"/>
          <w:right w:val="single" w:sz="6" w:space="0" w:color="94A3B8"/>
          <w:insideH w:val="single" w:sz="4" w:space="0" w:color="CBD5E1"/>
          <w:insideV w:val="single" w:sz="4" w:space="0" w:color="CBD5E1"/>
        </w:tblBorders>
      </w:tblPr>
      <w:tr>
        <w:tc>
          <w:tcPr>
            <w:tcW w:w="9400" w:type="dxa"/>
            <w:shd w:val="clear" w:color="auto" w:fill="E2E8F0"/>
          </w:tcPr>
          <w:p>
            <w:pPr><w:jc w:val="left"/><w:spacing w:before="60" w:after="60"/></w:pPr>
            <w:r>
              <w:rPr><w:b/><w:color w:val="1E3A8A"/></w:rPr>
              <w:t>CRITERIOS DE VALORACIÓN Y PAUTA DE EVALUACIÓN</w:t>
            </w:r>
          </w:p>
        </w:tc>
      </w:tr>
      <w:tr>
        <w:tc>
          <w:tcPr>
            <w:tcW w:w="9400" w:type="dxa"/>
            <w:tcMar>
              <w:top w:w="160" w:type="dxa"/>
              <w:bottom w:w="160" w:type="dxa"/>
              <w:left w:w="220" w:type="dxa"/>
              <w:right w:w="220" w:type="dxa"/>
            </w:tcMar>
          </w:tcPr>
          <w:p>
            <w:pPr>
              <w:jc w:val="left"/>
              <w:spacing w:line="280" w:lineRule="auto" w:before="60" w:after="80"/>
            </w:pPr>
            <w:r>
              <w:rPr><w:sz w:val="21"/><w:color w:val="1F2937"/></w:rPr>
              <w:t>{{instrumento_contenido}}</w:t>
            </w:r>
          </w:p>
        </w:tc>
      </w:tr>
    </w:tbl>

    <!-- ANEXO III: FICHA DE TRABAJO Y APLICACIÓN PRÁCTICA -->
    <w:p>
      <w:pPr>
        <w:pageBreakBefore/>
        <w:jc w:val="left"/>
        <w:spacing w:before="240" w:after="100"/>
      </w:pPr>
      <w:r>
        <w:rPr><w:b/><w:sz w:val="24"/><w:color w:val="1E3A8A"/></w:rPr>
        <w:t>ANEXO III: FICHA DE TRABAJO Y APLICACIÓN PRÁCTICA</w:t>
      </w:r>
    </w:p>

    <w:tbl>
      <w:tblPr>
        <w:tblW w:w="9400" w:type="dxa"/>
        <w:tblBorders>
          <w:top w:val="single" w:sz="6" w:space="0" w:color="94A3B8"/>
          <w:bottom w:val="single" w:sz="6" w:space="0" w:color="94A3B8"/>
          <w:left w:val="single" w:sz="6" w:space="0" w:color="94A3B8"/>
          <w:right w:val="single" w:sz="6" w:space="0" w:color="94A3B8"/>
          <w:insideH w:val="single" w:sz="4" w:space="0" w:color="CBD5E1"/>
          <w:insideV w:val="single" w:sz="4" w:space="0" w:color="CBD5E1"/>
        </w:tblBorders>
      </w:tblPr>
      <w:tr>
        <w:tc>
          <w:tcPr>
            <w:tcW w:w="9400" w:type="dxa"/>
            <w:shd w:val="clear" w:color="auto" w:fill="E2E8F0"/>
          </w:tcPr>
          <w:p>
            <w:pPr><w:jc w:val="left"/><w:spacing w:before="60" w:after="60"/></w:pPr>
            <w:r>
              <w:rPr><w:b/><w:color w:val="1E3A8A"/></w:rPr>
              <w:t>ACTIVIDADES Y SITUACIONES PROBLEMÁTICAS DE APLICACIÓN</w:t>
            </w:r>
          </w:p>
        </w:tc>
      </w:tr>
      <w:tr>
        <w:tc>
          <w:tcPr>
            <w:tcW w:w="9400" w:type="dxa"/>
            <w:tcMar>
              <w:top w:w="160" w:type="dxa"/>
              <w:bottom w:w="160" w:type="dxa"/>
              <w:left w:w="220" w:type="dxa"/>
              <w:right w:w="220" w:type="dxa"/>
            </w:tcMar>
          </w:tcPr>
          <w:p>
            <w:pPr>
              <w:jc w:val="left"/>
              <w:spacing w:line="280" w:lineRule="auto" w:before="60" w:after="80"/>
            </w:pPr>
            <w:r>
              <w:rPr><w:sz w:val="21"/><w:color w:val="1F2937"/></w:rPr>
              <w:t>{{ficha}}</w:t>
            </w:r>
          </w:p>
        </w:tc>
      </w:tr>
    </w:tbl>

  </w:body>
</w:document>`;

  zip.file('[Content_Types].xml', contentTypesXml);
  zip.file('_rels/.rels', rootRelsXml);
  zip.file('word/_rels/document.xml.rels', docRelsXml);
  zip.file('word/styles.xml', stylesXml);
  zip.file('word/document.xml', documentXml);

  const buffer = zip.generate({ type: 'nodebuffer', compression: 'DEFLATE' });
  const outDir = path.resolve(process.cwd(), 'public');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  fs.writeFileSync(path.join(outDir, 'modelo-minedu-sesion.docx'), buffer);
  console.log('Successfully updated public/modelo-minedu-sesion.docx with exact user template structure');
}

generateExactUserTemplateDocx();
