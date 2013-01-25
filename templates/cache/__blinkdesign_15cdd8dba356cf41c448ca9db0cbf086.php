<?php

class __blinkdesign_15cdd8dba356cf41c448ca9db0cbf086 extends Mustache_Template
{
    public function renderInternal(Mustache_Context $context, $indent = '', $escape = false)
    {
        $buffer = '';

        $buffer .= $indent . '<article class="excerpt post-excerpt">';
        $buffer .= "\n";
        $buffer .= $indent . '    <h1 class="hdr hdr-excerpt"><a href="';
        $value = $context->find('url');
        if (!is_string($value) && is_callable($value)) {
            $value = $this->mustache
                ->loadLambda((string) call_user_func($value))
                ->renderInternal($context, $indent);
        }
        $buffer .= htmlspecialchars($value, ENT_COMPAT, 'UTF-8');
        $buffer .= '" class="ajax">';
        $value = $context->find('title');
        if (!is_string($value) && is_callable($value)) {
            $value = $this->mustache
                ->loadLambda((string) call_user_func($value))
                ->renderInternal($context, $indent);
        }
        $buffer .= $value;
        $buffer .= '</a></h1>';
        $buffer .= "\n";
        $buffer .= $indent . '    <p>';
        $value = $context->find('excerpt');
        if (!is_string($value) && is_callable($value)) {
            $value = $this->mustache
                ->loadLambda((string) call_user_func($value))
                ->renderInternal($context, $indent);
        }
        $buffer .= $value;
        $buffer .= '</p>';
        $buffer .= "\n";
        $buffer .= $indent . '    ';
        // 'date' section
        $buffer .= $this->section90c3d6cd5fbfcc369fa22c6b8edea1b0($context, $indent, $context->find('date'));
        $buffer .= "\n";
        $buffer .= $indent . '    ';
        // 'image' section
        $buffer .= $this->section0e1fd9b3a89e4d007f90ac9ce17c4c6f($context, $indent, $context->find('image'));
        $buffer .= "\n";
        $buffer .= $indent . '</article>';
        $buffer .= "\n";

        if ($escape) {
            return htmlspecialchars($buffer, ENT_COMPAT, 'UTF-8');
        } else {
            return $buffer;
        }
    }

    private function section90c3d6cd5fbfcc369fa22c6b8edea1b0(Mustache_Context $context, $indent, $value) {
        $buffer = '';
        if (!is_string($value) && is_callable($value)) {
            $source = '<time datetime="{{w3c_date}}">{{date}}</time>';
            $buffer .= $this->mustache
                ->loadLambda((string) call_user_func($value, $source))
                ->renderInternal($context, $indent);
        } elseif (!empty($value)) {
            $values = $this->isIterable($value) ? $value : array($value);
            foreach ($values as $value) {
                $context->push($value);
                $buffer .= '<time datetime="';
                $value = $context->find('w3c_date');
                if (!is_string($value) && is_callable($value)) {
                    $value = $this->mustache
                        ->loadLambda((string) call_user_func($value))
                        ->renderInternal($context, $indent);
                }
                $buffer .= htmlspecialchars($value, ENT_COMPAT, 'UTF-8');
                $buffer .= '">';
                $value = $context->find('date');
                if (!is_string($value) && is_callable($value)) {
                    $value = $this->mustache
                        ->loadLambda((string) call_user_func($value))
                        ->renderInternal($context, $indent);
                }
                $buffer .= htmlspecialchars($value, ENT_COMPAT, 'UTF-8');
                $buffer .= '</time>';
                $context->pop();
            }
        }
    
        return $buffer;
    }

    private function section0e1fd9b3a89e4d007f90ac9ce17c4c6f(Mustache_Context $context, $indent, $value) {
        $buffer = '';
        if (!is_string($value) && is_callable($value)) {
            $source = '<a href="{{url}}" class="work-img work-img-mini"></a>';
            $buffer .= $this->mustache
                ->loadLambda((string) call_user_func($value, $source))
                ->renderInternal($context, $indent);
        } elseif (!empty($value)) {
            $values = $this->isIterable($value) ? $value : array($value);
            foreach ($values as $value) {
                $context->push($value);
                $buffer .= '<a href="';
                $value = $context->find('url');
                if (!is_string($value) && is_callable($value)) {
                    $value = $this->mustache
                        ->loadLambda((string) call_user_func($value))
                        ->renderInternal($context, $indent);
                }
                $buffer .= htmlspecialchars($value, ENT_COMPAT, 'UTF-8');
                $buffer .= '" class="work-img work-img-mini"></a>';
                $context->pop();
            }
        }
    
        return $buffer;
    }
}